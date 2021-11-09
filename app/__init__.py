from flask import Flask, request, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

# create the flask app and configure it
app = Flask(__name__)
app.config.from_object("config.Config")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///main.db'
# TODO: for some reason, SQLALCHEMY_DATABASE_URI is not importing from the config?!

# connect the SQLalchemy to the app
db = SQLAlchemy(app)

# connect marshmallow (after SQLalchemy!)
ma = Marshmallow(app)


# ---- SQLalchemy Models ----
# TODO: put this in its own file here so it's not smashed in the main file here?
# probably with the db instance as well...
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


# ---- Marshmallow Schema ----
class SchemaAlias(ma.SQLAlchemySchema):
    class Meta:
        model = ModelAlias
    
    character_name = ma.auto_field()
    account_name = ma.auto_field()

class SchemaFight(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ModelFight

schema_alias = SchemaAlias()
schema_fight = SchemaFight()


# ---- endpoint routing and methods ----
@app.route('/fights/<int:id>', methods=['GET'])
def getFightByID(id):
    """returns a fight with given ID."""
    f = ModelFight.query.get(id) # query.get() gets the entry by primary key
    # return {'response:' : f"{f}"}
    return schema_fight.dump(f)

@app.route('/aliases', methods=['GET', 'POST'])
def getAliases():
    """returns or creates the character name / account name pair for a given character name."""
    if request.method == 'GET':
        # get details on the query
        name = request.args.get('name')
        if name:
            # if name is given with '/aliases?name=character_name', give the alias of character_name
            a = ModelAlias.query.filter(ModelAlias.character_name.like(name)).first()

            if a:
                # return {'character_name' : alias.character_name, 'account_name' : alias.account_name}
                return schema_alias.dump(a)
            else:
                abort(404)
        else:
            # if no character_name is specified, return all aliases
            aliases = ModelAlias.query.all()
            d = []
            for a in aliases:
                d.append({'character_name' : a.character_name, 'account_name' : a.account_name})
            return jsonify(d)
            # TODO: figure out how to use marshmallow here??
    elif request.method == 'POST':
        accountName = request.args.get('account_name')
        characterName = request.args.get('character_name')

        if (accountName is None) or (characterName is None):
            abort(400)

        a = ModelAlias(character_name = characterName, account_name = accountName)
        db.session.add(a)
        db.session.commit()
        # TODO: this probably should return code 201 - "created"

        # return jsonify({'character_name' : a.character_name, 'account_name' : a.account_name})
        return schema_alias.dump(a)

@app.route('/', methods=['GET'])
def home():
    return jsonify({'status' : 'api running'})

if __name__ == '__main__':
    app.run()