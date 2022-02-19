from flask import Flask

app = Flask(__name__)

app.secret_key = "BLEH"

from flask_bcrypt import Bcrypt

bcrypt = Bcrypt(app)
DB = "flask_react_auth"