from flask import jsonify, request
from flask_app import app
from flask_app.models import post, user
from flask_app.controllers.users import token_required

@app.route("/posts")
def get_all_post():
    all_posts = post.Post.get_all()

    output = []
    for one_post in all_posts:
        output.append( one_post.serialize() )

    return jsonify(output)

@app.route("/posts", methods=['POST'])
@token_required
def create_post(curr_user):
    print(request.form)

    errors = post.Post.validate(request.form)

    if errors:
        return jsonify(errors), 401
    
    print(curr_user)
    data = {
        **request.form,
        "users_id": curr_user['id'],
        "img": ""
    }

    post_id = post.Post.save(data)

    return jsonify(post_id), 201