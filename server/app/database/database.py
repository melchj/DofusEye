import datetime
from flask_sqlalchemy import SQLAlchemy
from app import bcrypt
import jwt
from flask import current_app

db = SQLAlchemy()

# ---- SQLalchemy Models ----
# TODO: add a Base class that these inherit from, instead of db.Model?
class Fight(db.Model):
    __tablename__ = "perc_prism"

    fight_id = db.Column(db.Integer(), primary_key=True, unique=True)
    modified = db.Column(db.Integer(), default=0)
    guild_id = db.Column(db.BigInteger(), nullable=False)
    channel_id = db.Column(db.BigInteger(), nullable=False)
    date = db.Column(db.Integer(), nullable=False)
    file_path = db.Column(db.Text(), nullable=False)
    sword = db.Column(db.Text())
    w1_name = db.Column(db.Text())
    w1_class = db.Column(db.Text())
    w1_dead = db.Column(db.Integer())
    w2_name = db.Column(db.Text())
    w2_class = db.Column(db.Text())
    w2_dead = db.Column(db.Integer())
    w3_name = db.Column(db.Text())
    w3_class = db.Column(db.Text())
    w3_dead = db.Column(db.Integer())
    w4_name = db.Column(db.Text())
    w4_class = db.Column(db.Text())
    w4_dead = db.Column(db.Integer())
    w5_name = db.Column(db.Text())
    w5_class = db.Column(db.Text())
    w5_dead = db.Column(db.Integer())
    l1_name = db.Column(db.Text())
    l1_class = db.Column(db.Text())
    l1_dead = db.Column(db.Integer())
    l2_name = db.Column(db.Text())
    l2_class = db.Column(db.Text())
    l2_dead = db.Column(db.Integer())
    l3_name = db.Column(db.Text())
    l3_class = db.Column(db.Text())
    l3_dead = db.Column(db.Integer())
    l4_name = db.Column(db.Text())
    l4_class = db.Column(db.Text())
    l4_dead = db.Column(db.Integer())
    l5_name = db.Column(db.Text())
    l5_class = db.Column(db.Text())
    l5_dead = db.Column(db.Integer())

    def __repr__(self) -> str:
        return f"a fight... W1: {self.w1_name}, L1: {self.l1_name}."

class Alias(db.Model):
    __tablename__ = "aliases"

    # id = db.Column(db.Integer())
    character_name = db.Column(db.Text(), primary_key=True, unique=True)
    account_name = db.Column(db.Text())

    def __repr__(self) -> str:
        return f"<Alias: ({self.account_name}) {self.character_name}>"

# reference: https://realpython.com/token-based-authentication-with-flask/
class User(db.Model):
    """ User Model for storing user related details """
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    registered_on = db.Column(db.DateTime, nullable=False)
    admin = db.Column(db.Boolean, nullable=False, default=False)

    def __init__(self, username, password, admin=False):
        self.username = username
        self.password_hash = bcrypt.generate_password_hash(
            password#, current_app.config['BCRYPT_LOG_ROUNDS']
        ).decode()
        self.registered_on = datetime.datetime.now()
        self.admin = admin

    def encode_auth_token(self, user_id):
        """
        Generates the Auth Token
        :return: string
        """
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1, seconds=5),
                'iat': datetime.datetime.utcnow(),
                'sub': user_id
            }
            result = jwt.encode(
                payload,
                current_app.config['SECRET_KEY'],
                algorithm='HS256'
            )
            return result
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        """
        Decodes the auth token
        :param auth_token:
        :return: integer|string
        """
        try:
            payload = jwt.decode(
                auth_token,
                current_app.config['SECRET_KEY'],
                algorithms=['HS256']
            )
            return payload['sub']
        except jwt.ExpiredSignatureError as e:
            # print(e)
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError as e:
            # print(e)
            return 'Invalid token. Please log in again.'
