from flask import Flask, request, jsonify, abort, send_file
from flask_migrate import Migrate
from flask_cors import CORS
from sqlalchemy import or_
from functools import wraps
from werkzeug.utils import redirect
from app.stats import getCharacterStats
from app.stats import getCharacterClass
import boto3
from botocore.config import Config

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
    # print(app.config)
    CORS(app)

    # TODO: idk... make sure this is the "best" way to authenticate with a secret key
    # create decorator function to require api key
    def require_apikey(view_function):
        @wraps(view_function)
        # the new, post-decoration function. Note *args and **kwargs here.
        def decorated_function(*args, **kwargs):
            key = app.config['SECRET_KEY']
            if request.headers.get('x-api-key') and request.headers.get('x-api-key') == key:
                return view_function(*args, **kwargs)
            elif request.args.get('key') and request.args.get('key') == key:
                return view_function(*args, **kwargs)
            else:
                abort(401)
        return decorated_function

    # import SQLalchemy models and db, attach app to db
    from app.database.database import db, Fight, Alias
    db.init_app(app)

    # create migrate object to handle creation/migration/upgrade of db
    migrate = Migrate(app, db)

    # import marshmallow schema, attach app
    from app.schema import ma, schema_alias, schema_fight, schema_fights, schema_aliases
    ma.init_app(app)

    # query function(s)
    def queryFightsbyCharacter(character_name):
        """returns query results of all fights with this character name."""
        # TODO: need to filter out results that come from testing channels. see discord bot query
        queryResult = db.session.query(Fight).filter(
            or_(
                Fight.w1_name.ilike(character_name),
                Fight.w2_name.ilike(character_name),
                Fight.w3_name.ilike(character_name),
                Fight.w4_name.ilike(character_name),
                Fight.w5_name.ilike(character_name),
                Fight.l1_name.ilike(character_name),
                Fight.l2_name.ilike(character_name),
                Fight.l3_name.ilike(character_name),
                Fight.l4_name.ilike(character_name),
                Fight.l5_name.ilike(character_name)
            )
        )
        return queryResult

    # ---- stats endpoints ----
    @app.route('/api/stats/characters/<string:character_name>', methods=['GET'])
    @require_apikey
    def endpointCharacterStats(character_name):
        # query all fights this char is in
        queryResult = queryFightsbyCharacter(character_name)

        fightsList = schema_fights.dump(queryResult)

        result = getCharacterStats(fightsList, character_name)
        result['charName'] = character_name
        result['charClass'] = getCharacterClass(fightsList, character_name)
        return jsonify(result)

    # ---- fights endpoints ----
    @app.route('/api/fights/<int:id>', methods=['GET'])
    @require_apikey
    def getFightByID(id):
        """returns a fight with given ID."""
        f = Fight.query.get(id) # query.get() gets the entry by primary key

        if f:
            return schema_fight.dump(f)
        else:   
            abort(404)
    
    @app.route('/api/fights/characters/<string:character_name>', methods=['GET'])
    @require_apikey
    def getFightByCharacter(character_name):
        """returns all the fights that this character is in. or 404 if none found."""
        result = queryFightsbyCharacter(character_name)
        if result:
            return jsonify(schema_fights.dump(result))
        else:
            abort(404)

    @app.route('/api/fights', methods=['GET'])
    @require_apikey
    def getFights():
        """
        returns all fights or just those with given ID(s), if specified.
        parameters:
            none - returns all fights in DB
            id - returns fight with given id
            ids - should be comma separated numbers (e.g. '?ids=12,55,213'). returns all fights listed.
        """
        id = request.args.get('id')
        ids = request.args.get('ids')

        if ids:
            ids = ids.split(',')
            # result = db.session.query(Fight).filter(or_(*[Fight.fight_id.like(_id) for _id in ids]))
            result = db.session.query(Fight).filter(or_(*[(Fight.fight_id==_id) for _id in ids]))
            if result:
                return jsonify(schema_fights.dump(result))
            else:
                abort(404)

        elif id:
            f = Fight.query.get(id)
            if f:
                return schema_fight.dump(f)
            else:   
                abort(404)

        else:
            f = Fight.query.all()
            return jsonify(schema_fights.dump(f))

    # ---- screenshot endpoint(s) ----
    @app.route('/api/fights/<int:id>/image', methods=['GET'])
    @require_apikey
    def getFightImage(id):
        f = Fight.query.get(id) # query.get() gets the entry by primary key
        fight = schema_fight.dump(f)
        path = fight['file_path']

        # TODO: add check that file exists

        my_config = Config(
            signature_version='s3v4',
            region_name='us-east-2'
            )

        # connect to aws s3, generate and return a presigned URL for the image
        s3 = boto3.client(  's3',
                            aws_access_key_id=app.config['S3_ACCESS_KEY'],
                            aws_secret_access_key=app.config['S3_SECRET_KEY'],
                            config=my_config)

        url = s3.generate_presigned_url('get_object', Params={'Bucket': app.config['S3_BUCKET_NAME'], 'Key': path}, ExpiresIn = 600)
        # return redirect(url, code=302)
        return url

    # ---- fightIDs endpoints ----
    @app.route('/api/fightids/characters/<string:character_name>', methods=['GET'])
    @require_apikey
    def getFightIDforCharacter(character_name):
        """
        returns a list of ints: the fight IDs for all fights that the character is in.
        """
        # TODO: figure out if there is a way to use queryFightsbyCharacter fct and then extract just the Fight.fight_id's?
        # that way we don't need to duplicate query code and such
        result = db.session.query(Fight.fight_id).filter(
            or_(
                Fight.w1_name.ilike(character_name),
                Fight.w2_name.ilike(character_name),
                Fight.w3_name.ilike(character_name),
                Fight.w4_name.ilike(character_name),
                Fight.w5_name.ilike(character_name),
                Fight.l1_name.ilike(character_name),
                Fight.l2_name.ilike(character_name),
                Fight.l3_name.ilike(character_name),
                Fight.l4_name.ilike(character_name),
                Fight.l5_name.ilike(character_name)
            )
        )
        # TODO: need to filter out results that come from testing channels. see discord bot query
        if result:
            return jsonify(schema_fights.dump(result))
        else:
            abort(404)

    # ---- aliases endpoints ----
    # TODO: figure out if this should use a different endpoint (e.i. '/api/aliases/<character_name>)
    # or if it is better as a query string (e.i. '/api/aliases?name=character_name')
    # ... i'm not sure which is better or when to use which one...
    @app.route('/api/aliases', methods=['GET', 'POST'])
    @require_apikey
    def getAliases():
        """returns or creates the character name / account name pair for a given character name."""
        if request.method == 'GET':
            # get details on the query
            name = request.args.get('name')
            if name:
                # if name is given with '/aliases?name=character_name', give the alias info of character_name
                a = Alias.query.filter(Alias.character_name.ilike(name)).first()

                if a:
                    return schema_alias.dump(a)
                else:
                    abort(404)
            else:
                # if no character_name is specified, return all aliases
                aliases = Alias.query.all()
                return jsonify(schema_aliases.dump(aliases))

        elif request.method == 'POST':
            accountName = request.args.get('account_name')
            characterName = request.args.get('character_name')

            if (accountName is None) or (characterName is None):
                abort(400)

            a = Alias(character_name = characterName, account_name = accountName)
            db.session.add(a)
            db.session.commit()
            # TODO: this probably should return code 201 - "created"

            # return jsonify({'character_name' : a.character_name, 'account_name' : a.account_name})
            return schema_alias.dump(a)

    # ---- index endpoint ----
    @app.route('/api/', methods=['GET'])
    def index():
        return jsonify({'status' : 'api running'})
    
    return app