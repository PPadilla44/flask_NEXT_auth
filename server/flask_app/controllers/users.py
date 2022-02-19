from datetime import datetime, timedelta
from distutils.log import error
import json
from flask_app import app, bcrypt
from flask import jsonify, make_response, request
from flask_app.models import user
import jwt
from functools import wraps

# decorator for verifying the JWT


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # jwt is passed in the request header
        if 'X-Auth-Token' in request.headers:
            token = request.headers['X-Auth-Token']
        # return 401 if token is not passed
        if not token:
            return jsonify({'message': 'Token is missing !!'}), 401

        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(token, app.secret_key, algorithms=["HS256"] )
            print(data)
            current_user = user.User.get_user_by_id({"id": data['public_id']}).serialize()

        except:
            return jsonify({
                'message': 'Token is invalid !!'
            }), 401
        # returns the current logged in users contex to the routes
        return f(current_user, *args, **kwargs)

    return decorated


@app.route('/register', methods=["POST"])
def create_user():

    print(request.form)

    errors = user.User.register_validation(request.form)

    if errors:
        return jsonify(errors), 401

    hashy = bcrypt.generate_password_hash(request.form["password"])

    data = {
        **request.form,
        'password': hashy,
    }

    user_id = user.User.save(data)
    return jsonify({"id": user_id})


@app.route("/users")
@token_required
def get_all(curr_user):

    print(curr_user)
    
    all_users = user.User.get_all()

    print(all_users)

    output = []
    for one_user in all_users:
        output.append({
            "public_id": one_user.id,
            "email": one_user.email
        })

    return jsonify(  output  )


@app.route('/login', methods=['POST'])
def login():

    auth = request.form
    print(auth)

    if not auth or not auth.get("email") or not auth.get("password"):
        return jsonify(["Invalid Login"]), 401

    get_user = user.User.get_user_by_email({'email': auth.get('email')})

    errors = user.User.login_validation(get_user, auth.get('password'))

    if errors:
        return jsonify(errors), 401

    token = jwt.encode({
        "public_id": get_user.id,
        "exp": datetime.utcnow() + timedelta(minutes=30)
    }, app.secret_key, algorithm="HS256")


    return jsonify({"token": token }), 201
