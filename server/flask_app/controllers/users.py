import json
from flask_app import app
from flask import jsonify, request
from flask_app.models import user

@app.route('/')
def test():

    return jsonify(MSG = "YEs")

@app.route('/register', methods=["POST"])
def create_user():

    user_id = user.User.save(request.form)
    return jsonify({"id": user_id})

@app.route("/users/<int:id>")
def get_user_by_id(id):
    one_user = user.User.userToDict(user.User.get_user_by_id({'id': id}))
    print(one_user)
    return jsonify(one_user)

@app.route('/login', methods=['POST'])
def login():
    
    get_user = user.User.get_user_by_email({'email': request.form['email']})
    if not user.User.login_validation(get_user,request.form['password']):
        return redirect('/')
    
    return user.User.userToDict(get_user)
