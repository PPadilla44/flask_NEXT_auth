from ..config.mysqlconnection import connectToMySQL
from flask_app import DB

class Post: 
    def __init__(self, data):
        self.id = data['id']
        self.text = data['text']
        self.img = data['img']
        self.created_at = data["created_at"]
        self.updated_at = data["updated_at"]
        self.users_id = data['users_id']

    def serialize(self):
        return {
            "id": self.id,
            "text": self.text,
            "img": self.img,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "users_id": self.users_id
        }
    

    @classmethod
    def save(cls, data: dict):
        query = "INSERT INTO posts (text, img, users_id) \
        VALUES (%(text)s, %(img)s, %(users_id)s);"
        return connectToMySQL(DB).query_db(query, data)


    @classmethod
    def get_all(cls):
        query = "SELECT * from posts"
        results = connectToMySQL(DB).query_db(query)

        if not results:
            return []

        posts = []

        for item in results:
            posts.append(cls(item))
        return posts

    @staticmethod
    def validate(post) -> list:
        errors = []

        if len(post['text']) < 2:
            errors.append("Text must be longer")

        return errors

