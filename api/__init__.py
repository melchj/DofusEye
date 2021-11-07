from flask import Flask
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
import os

# create the flask app
app = Flask(__name__)

# create the flask_restful API
api = Api(app)
app.config.from_object("config.Config")

# connect the SQLalchemy to the app
db = SQLAlchemy(app)
# db.create_all() # creates the database from scratch

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username

class Fight(db.Model):
    fight_id = db.Column(db.Integer, primary_key=True, unique=True)
    modified = db.Column(db.Integer, default=0)
    guild_id = db.Column(db.Integer, nullable=False)
    channel_id = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Integer, nullable=False)
    file_path = db.Column(db.String(), nullable=False)
    sword = db.Column(db.String(), nullable=False)
    w1_name = db.Column(db.String())
    w1_class = db.Column(db.String())
    w1_dead = db.Column(db.Integer())
    w2_name = db.Column(db.String())
    w2_class = db.Column(db.String())
    w2_dead = db.Column(db.Integer())
    w3_name = db.Column(db.String())
    w3_class = db.Column(db.String())
    w3_dead = db.Column(db.Integer())
    w4_name = db.Column(db.String())
    w4_class = db.Column(db.String())
    w4_dead = db.Column(db.Integer())
    w5_name = db.Column(db.String())
    w5_class = db.Column(db.String())
    w5_dead = db.Column(db.Integer())
    l1_name = db.Column(db.String())
    l1_class = db.Column(db.String())
    l1_dead = db.Column(db.Integer())
    l2_name = db.Column(db.String())
    l2_class = db.Column(db.String())
    l2_dead = db.Column(db.Integer())
    l3_name = db.Column(db.String())
    l3_class = db.Column(db.String())
    l3_dead = db.Column(db.Integer())
    l4_name = db.Column(db.String())
    l4_class = db.Column(db.String())
    l4_dead = db.Column(db.Integer())
    l5_name = db.Column(db.String())
    l5_class = db.Column(db.String())
    l5_dead = db.Column(db.Integer())

    def __repr__(self) -> str:
        return f"a fight... W1: {self.w1_name}, L1: {self.l1_name}."


class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

# a class of the object that we want to get/put
class Fight2(Resource):
    # the thing returned from get here must be json serializable
    def get(self, account_name):
        return {'data': f'hello {account_name}'}
    
    # stores data
    # def post(self):
    #     return {'uhhh': 'hmmm posted (allegedly)'}

# add the resource to a certain url
api.add_resource(HelloWorld, '/')
api.add_resource(Fight2, '/fight/<string:account_name>')

if __name__ == '__main__':
    app.run()