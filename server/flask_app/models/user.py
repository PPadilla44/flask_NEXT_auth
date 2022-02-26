from ..config.mysqlconnection import connectToMySQL
from flask_app import DB, bcrypt
import re


EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')


class User:
    def __init__(self, data):
        self.id = data["id"]
        self.first_name = data["first_name"]
        self.last_name = data["last_name"]
        self.avatar = data["avatar"]
        self.cover_photo = data["cover_photo"]
        self.email = data["email"]
        self.password = data["password"]
        self.created_at = data["created_at"]
        self.updated_at = data["updated_at"]

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "avatar": self.avatar,
            "email": self.email,
            "password": self.password,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "cover_photo": self.cover_photo
        }

    @classmethod
    def get_all(cls):
        query = "SELECT * from users"
        results = connectToMySQL(DB).query_db(query)

        if not results:
            return []

        users = []

        for item in results:
            users.append(cls(item))
        return users


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
        query = "INSERT INTO users (first_name, last_name, email,password) \
        VALUES (%(first_name)s, %(last_name)s, %(email)s, %(password)s);"
        return connectToMySQL(DB).query_db(query, data)

    @classmethod
    def update_avatar(cls, data):
        query = "UPDATE users SET avatar = %(avatar)s where id = %(id)s"
        return connectToMySQL(DB).query_db(query, data)

    @classmethod
    def update_cover(cls, data):
        query = "UPDATE users SET cover_photo = %(cover_photo)s where id = %(id)s"
        return connectToMySQL(DB).query_db(query, data)

    @staticmethod
    def register_validation(user):

        errors = []
        if len(user['first_name']) < 2:
            errors.append('First name must be at least 2 characters')
        else:
            if not str(user['first_name']).isalpha():
                errors.append('First name can NOT contain numbers')

        if len(user['last_name']) < 2:
            errors.append('Last name must be at least 2 characters')
        else:
            if not str(user['last_name']).isalpha():
                errors.append('Last name can NOT contain numbers')

        if not EMAIL_REGEX.match(user['email']):
            errors.append('Invalid email address')
        else:
            if User.get_user_by_email({'email': user['email']}):
                errors.append('Email address already taken')

        if len(user['password']) < 8:
            errors.append('Password must be at least 8 characters')

        if user['password'] != user["cPassword"]:
            errors.append('Passwords do not match')

        return errors

    @staticmethod
    def login_validation(user, password) -> list:

        errors = []

        if not user:
            errors.append("Invalid Login")
            return errors
        if not bcrypt.check_password_hash(user.password, password):
            errors.append("Invalid Login")
            return errors

        return errors
