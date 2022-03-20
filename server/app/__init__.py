from flask import Flask, Response, request, jsonify, abort
from flask_migrate import Migrate
from flask_cors import CORS
from sqlalchemy import or_
from app.stats import getCharacterStats
from app.stats import getCharacterClass
import boto3
from botocore.config import Config
from app.filters import filterFights
from flask_bcrypt import Bcrypt
from app.wrappers import require_token, require_admin_token

# TODO: request parser type thing? to better return errors when request doesnt include required info?
# see:
# https://www.youtube.com/watch?v=GMppyAPbLYk
# https://www.techwithtim.net/flask-rest-api/

bcrypt = Bcrypt()

# ---- application factory ----
def create_app():
    # TODO: accept configs in this method

    # create the flask app
    app = Flask(__name__)
    app.config.from_object("config.Config")
    # print(app.config)

    flask_env = app.config['FLASK_ENV']

    origins = []
    if flask_env == "development":
        origins = [
            "http://localhost:3000",
            "http://dev.localhost:3000",
            "http://localhost:3001",
            "http://dev.localhost:3001",
        ]
    elif flask_env == "production":
        origins = [
            "https://www.dofuseye.com",
            "https://dofuseye.com",
        ]
    # print(f"CORS origins: {origins}")
    CORS(app, resources={r"/*": {'origins': origins}}, supports_credentials=True)

    bcrypt.init_app(app)

    # import SQLalchemy models and db, attach app to db
    from app.database.database import db, Fight, Alias, User
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
    def getFightByID(id):
        """returns a fight with given ID."""
        f = Fight.query.get(id) # query.get() gets the entry by primary key

        if f:
            return schema_fight.dump(f)
        else:   
            abort(404)
    
    @app.route('/api/fights/characters/<string:character_name>', methods=['GET'])
    def getFightByCharacter(character_name):
        """
        returns all the fights that this character is in. or 404 if none found.
        filters by filters specified in query. filters default to true
        a = "attacks"
        d = "defences"
        w = "wins"
        l = "losses"
        """
        result = queryFightsbyCharacter(character_name)
        # if result is None:
        #     abort(404)

        a = True
        d = True
        w = True
        l = True
        if (request.args.get('a') and (request.args.get('a').lower() == 'false')):
            a = False
        if (request.args.get('d') and (request.args.get('d').lower() == 'false')):
            d = False
        if (request.args.get('w') and (request.args.get('w').lower() == 'false')):
            w = False
        if (request.args.get('l') and (request.args.get('l').lower() == 'false')):
            l = False

        filteredResult = filterFights(schema_fights.dump(result), character_name, attacks=a, defs=d, wins=w, losses=l)
        return jsonify(filteredResult.to_dict(orient='records'))

    @app.route('/api/fights', methods=['GET'])
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
    
    @app.route('/api/fights/post', methods=['POST'])
    @require_admin_token
    def postFight():
        '''this is endpoint used by discord bot (for now) to post fights after they are made'''
        post_data = request.get_json()
        fight = Fight(
            modified = 0,
            guild_id = post_data['guild_id'],
            channel_id = post_data['channel_id'],
            date = post_data['date'],
            file_path = post_data['file_path'],
            sword = post_data['sword'],
            w1_name  = None if post_data['w1_name'] == ''  else post_data['w1_name'],
            w1_class = None if post_data['w1_class'] == '' else post_data['w1_class'],
            w1_dead  = post_data['w1_dead'],
            w2_name  = None if post_data['w2_name'] == ''  else post_data['w2_name'],
            w2_class = None if post_data['w2_class'] == '' else post_data['w2_class'],
            w2_dead  = post_data['w2_dead'],
            w3_name  = None if post_data['w3_name'] == ''  else post_data['w3_name'],
            w3_class = None if post_data['w3_class'] == '' else post_data['w3_class'],
            w3_dead  = post_data['w3_dead'],
            w4_name  = None if post_data['w4_name'] == ''  else post_data['w4_name'],
            w4_class = None if post_data['w4_class'] == '' else post_data['w4_class'],
            w4_dead  = post_data['w4_dead'],
            w5_name  = None if post_data['w5_name'] == ''  else post_data['w5_name'],
            w5_class = None if post_data['w5_class'] == '' else post_data['w5_class'],
            w5_dead  = post_data['w5_dead'],
            l1_name  = None if post_data['l1_name'] == ''  else post_data['l1_name'],
            l1_class = None if post_data['l1_class'] == '' else post_data['l1_class'],
            l1_dead  = post_data['l1_dead'],
            l2_name  = None if post_data['l2_name'] == ''  else post_data['l2_name'],
            l2_class = None if post_data['l2_class'] == '' else post_data['l2_class'],
            l2_dead  = post_data['l2_dead'],
            l3_name  = None if post_data['l3_name'] == ''  else post_data['l3_name'],
            l3_class = None if post_data['l3_class'] == '' else post_data['l3_class'],
            l3_dead  = post_data['l3_dead'],
            l4_name  = None if post_data['l4_name'] == ''  else post_data['l4_name'],
            l4_class = None if post_data['l4_class'] == '' else post_data['l4_class'],
            l4_dead  = post_data['l4_dead'],
            l5_name  = None if post_data['l5_name'] == ''  else post_data['l5_name'],
            l5_class = None if post_data['l5_class'] == '' else post_data['l5_class'],
            l5_dead  = post_data['l5_dead']
        )
        db.session.add(fight)

        db.session.flush()
        print(f"added fight: id={fight.fight_id}")
        # TODO: this assumes every file is PNG file type. need to allow for all file types
        fight.file_path = f"saved/{fight.guild_id}/{fight.channel_id}/{fight.fight_id}.png"
        db.session.commit()

        # connect to aws s3, respond to this request with presigned URL for requester to upload the screenshot
        my_config = Config(
            signature_version='s3v4',
            region_name='us-east-2'
            )
        s3 = boto3.client(
            's3',
            aws_access_key_id=app.config['S3_ACCESS_KEY'],
            aws_secret_access_key=app.config['S3_SECRET_KEY'],
            config=my_config
        )
        url = s3.generate_presigned_post(app.config['S3_BUCKET_NAME'], fight.file_path, ExpiresIn = 1800)

        return (jsonify({
            "fight_id": fight.fight_id,
            "upload_url": url
        }), 201)

    # ---- screenshot endpoint(s) ----
    @app.route('/api/fights/<int:id>/image', methods=['GET'])
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
        # TODO: should all boto client objects be shared? is it bad to re-create and log in like this each time?
        s3 = boto3.client(
            's3',
            aws_access_key_id=app.config['S3_ACCESS_KEY'],
            aws_secret_access_key=app.config['S3_SECRET_KEY'],
            config=my_config
        )

        url = s3.generate_presigned_url('get_object', Params={'Bucket': app.config['S3_BUCKET_NAME'], 'Key': path}, ExpiresIn = 600)
        # return redirect(url, code=302)
        return url

    # ---- fightIDs endpoints ----
    @app.route('/api/fightids/characters/<string:character_name>', methods=['GET'])
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
    @app.route('/api/aliases', methods=['GET'])
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

    # ---- authentication endpoints ----
    @app.route('/auth/register', methods=['POST'])
    def auth_register():
        # get the post data
        post_data = request.get_json()
        # check if user already exists
        user = User.query.filter_by(username=post_data['username']).first()
        if not user:
            try:
                user = User(
                    username=post_data['username'],
                    password=post_data['password']
                )

                # insert the user
                db.session.add(user)
                db.session.commit()
                # generate the auth token
                auth_token = user.encode_auth_token(user.id)
                responseObject = {
                    'status': 'success',
                    'message': 'Successfully registered.',
                    'auth_token': auth_token
                }
                return (jsonify(responseObject), 201)
            except Exception as e:
                print(e)
                responseObject = {
                    'status': 'fail',
                    'message': 'Some error occurred. Please try again.'
                }
                return (jsonify(responseObject), 500)
        else:
            responseObject = {
                'status': 'fail',
                'message': 'User already exists. Please Log in.',
            }
            return (jsonify(responseObject), 409)

    @app.route('/auth/login', methods=['POST'])
    def auth_login():
        # get the post data
        post_data = request.get_json()
        try:
            # fetch the user data
            user = User.query.filter_by(
                username=post_data['username']
            ).first()
            if user and bcrypt.check_password_hash(user.password_hash, post_data['password']):
                auth_token = user.encode_auth_token(user.id)
                if auth_token:
                    responseObject = {
                        'status': 'success',
                        'message': 'Successfully logged in.',
                        'auth_token': auth_token
                    }
                    return (jsonify(responseObject), 200)
            else:
                responseObject = {
                    'status': 'fail',
                    'message': 'Username or password is incorrect.'
                }
                return (jsonify(responseObject), 404)
        except Exception as e:
            print(e)
            responseObject = {
                'status': 'fail',
                'message': 'Request failed due to error.'
            }
            return (jsonify(responseObject), 500)

    @app.route('/auth/status', methods=['GET'])
    def auth_status():
        # get the auth token and decode it
        auth_token = request.headers.get('Authorization')
        if auth_token:
            resp = User.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                user = User.query.filter_by(id=resp).first()
                responseObject = {
                    'status': 'success',
                    'data': {
                        'user_id': user.id,
                        'username': user.username,
                        'admin': user.admin,
                        'registered_on': user.registered_on
                    }
                }
                return (jsonify(responseObject), 200)
            responseObject = {
                'status': 'fail',
                'message': resp
            }
            return (jsonify(responseObject), 401)
        else:
            responseObject = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return (jsonify(responseObject), 401)
    
    @app.route('/api/test', methods=['GET'])
    @require_token
    def token_test():
        return Response('bruh it worked i think')

    @app.route('/api/test2', methods=['GET'])
    @require_admin_token
    def token_test2():
        return Response('bruh it worked i think, ADMIIIIIIN')

    # ---- index endpoint ----
    @app.route('/api/', methods=['GET'])
    def index():
        return jsonify({'status' : 'api running'})
    
    return app