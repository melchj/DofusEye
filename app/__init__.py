from flask import Flask, request, jsonify, abort

# TODO: request parser type thing? to better return errors when request doesnt include required info?
# see:
# https://www.youtube.com/watch?v=GMppyAPbLYk
# https://www.techwithtim.net/flask-rest-api/


# ---- application factory ----
def create_app():
    # TODO: accept configs in this method

    # create the flask app
    app = Flask(__name__)
    app.config.from_object("config.Config")

    # import SQLalchemy models and db, attach app to db
    from app.database.database import db, ModelFight, ModelAlias
    db.init_app(app)

    # import marshmallow schema, attach app
    from app.schema import ma, schema_alias, schema_fight, schema_fights, schema_aliases
    ma.init_app(app)

    # ---- fights endpoints ----
    @app.route('/fights/<int:id>', methods=['GET'])
    def getFightByID(id):
        """returns a fight with given ID."""
        f = ModelFight.query.get(id) # query.get() gets the entry by primary key

        if f:
            return schema_fight.dump(f)
        else:   
            abort(404)
    
    @app.route('/fights', methods=['GET'])
    def getFights():
        """returns all fights."""
        f = ModelFight.query.all()

        return jsonify(schema_fights.dump(f))

    # ---- aliases endpoints ----
    @app.route('/aliases', methods=['GET', 'POST'])
    def getAliases():
        """returns or creates the character name / account name pair for a given character name."""
        if request.method == 'GET':
            # get details on the query
            name = request.args.get('name')
            if name:
                # if name is given with '/aliases?name=character_name', give the alias info of character_name
                a = ModelAlias.query.filter(ModelAlias.character_name.like(name)).first()

                if a:
                    return schema_alias.dump(a)
                else:
                    abort(404)
            else:
                # if no character_name is specified, return all aliases
                aliases = ModelAlias.query.all()
                return jsonify(schema_aliases.dump(aliases))

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

    # ---- index enpoint ----
    @app.route('/', methods=['GET'])
    def index():
        return jsonify({'status' : 'api running'})
    
    return app