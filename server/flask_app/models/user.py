from ..config.mysqlconnection import connectToMySQL
from flask_app import DB, bcrypt
import re


EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')


class User:
    def __init__(self, data):
        self.id = data["id"]
        self.email = data["email"]
        self.password = data["password"]
        self.created_at = data["created_at"]
        self.updated_at = data["updated_at"]

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "password": self.password,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
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
        query = "INSERT INTO users (email,password) \
        VALUES (%(email)s,%(password)s);"
        return connectToMySQL(DB).query_db(query, data)

    @staticmethod
    def register_validation(user):

        errors = []

        if not EMAIL_REGEX.match(user['email']):
            errors.append('Invalid email address')
            # flash(u'Invalid email address','email')
        else:
            if User.get_user_by_email({'email': user['email']}):
                errors.append('Email address already taken')
                # flash(u'Email address already taken','email')

        if len(user['password']) < 8:
            errors.append('Password must be at least 8 characters')
            # flash(u'Password must be at least 8 characters','password')

        if user['password'] != user["cPassword"]:
            errors.append('Passwords do not match')
            # flash(u'Passwords do not match','confirm_password')

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
