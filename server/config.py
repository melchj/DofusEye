"""App configuration."""
from os import environ

class Config:
    """Set Flask configuration vars from .env file."""

    # general config
    FLASK_APP = environ.get("FLASK_APP")
    FLASK_ENV = environ.get("FLASK_ENV")
    SECRET_KEY = environ.get("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = environ.get("DATABASE_URL").replace("postgres://", "postgresql://", 1)
    # replace statement abvoe is a workaround for a heroku postgres quirk
    # see: https://stackoverflow.com/questions/66690321/flask-and-heroku-sqlalchemy-exc-nosuchmoduleerror-cant-load-plugin-sqlalchemy
    SQLALCHEMY_TRACK_MODIFICATIONS = False