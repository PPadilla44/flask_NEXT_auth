from ..config.mysqlconnection import connectToMySQL
from flask_app import DB

class User:
    def __init__(self, data):
        self.id = data["id"]
        self.email = data["email"]
        self.password = data["password"]
        self.created_at = data["created_at"]
        self.updated_at = data["updated_at"]

    @classmethod
    def get_user_by_email(cls, data):
        query = "SELECT * FROM users WHERE email = %(email)s;"
        results = connectToMySQL(DB).query_db(query, data)
        if len(results) < 1:
            return False
        return cls(results[0])
    
    @classmethod
    def get_user_by_id(cls, data):
        query = "SELECT * FROM users WHERE id = %(id)s;"
        results = connectToMySQL(DB).query_db(query, data)
        if len(results) < 1:
            return False
        return cls(results[0])

    @classmethod
    def save(cls, data):
        query = "INSERT INTO users (email,password) \
        VALUES (%(email)s,%(password)s);"
        return connectToMySQL(DB).query_db(query, data)

    @staticmethod
    def userToDict(self, data):
        return dir(data)