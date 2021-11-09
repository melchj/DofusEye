from flask import Flask, request
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy

# create the flask app
app = Flask(__name__)

# create the flask_restful API
api = Api(app)
app.config.from_object("config.Config")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///main.db'
# TODO: for some reason, SQLALCHEMY_DATABASE_URI is not importing from the config?!

# connect the SQLalchemy to the app
db = SQLAlchemy(app)

# TODO: is there a way to put this in its own file here so it's not smashed in the main file?
class ModelFight(db.Model):
    __tablename__ = "perc_prism"

    fight_id = db.Column(db.Integer, primary_key=True, unique=True)
    modified = db.Column(db.Integer, default=0)
    guild_id = db.Column(db.Integer, nullable=False)
    channel_id = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Integer, nullable=False)
    file_path = db.Column(db.Text(), nullable=False)
    sword = db.Column(db.Text(), nullable=False)
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

class ModelAlias(db.Model):
    __tablename__ = "aliases"

    # id = db.Column(db.Integer())
    character_name = db.Column(db.Text, primary_key=True, unique=True)
    account_name = db.Column(db.Text)

    def __repr__(self) -> str:
        return f"<Alias: ({self.account_name}) {self.character_name}>"

class ResourceFight(Resource):
    def get(self):
        fightCount = ModelFight.query.count()
        temp = 'test'

        # get details on the query
        query_parameters = request.args
        id = query_parameters.get('id')
        if id:
            temp = id
        return {temp : fightCount}

class ResourceAlias(Resource):
    def get(self):
        """returns the character name / account name pair for a given character name."""
        # get details on the query
        query_parameters = request.args
        name = query_parameters.get('name')
        if name:
            alias = ModelAlias.query.filter(ModelAlias.character_name.like(name)).first()

            if alias:
                return {'character_name' : alias.character_name, 'account_name' : alias.account_name}
            else:
                return f"error 404: '{name}'' character name not found."
        else:
            return {'error' : 'must provide a query string.'}

api.add_resource(ResourceFight, '/test')
api.add_resource(ResourceAlias, '/alias')

if __name__ == '__main__':
    app.run()