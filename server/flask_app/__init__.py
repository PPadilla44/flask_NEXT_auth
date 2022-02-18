from flask import Flask

app = Flask(__name__)

app.secret_key = "BLEH"
DB = "flask_react_auth"