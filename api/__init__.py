from flask import Flask
import os
# from markupsafe import escape

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'main.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple "home page"
    @app.route('/')
    def index():
        return 'Dofus Eye main page!!!!'

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    # register the database code with the app
    from . import db
    db.init_app(app)

    # register the "query" blueprint
    from . import query
    app.register_blueprint(query.bp)

    return app

# @app.route('/')
# def index():
#     return 'Dofus Eye main page!!!!'

# @app.route('/hello')
# def hello():
#     return 'Hello, World'

# # @app.route("/<name>")
# # def hello(name):
# #     return f"Hello, {escape(name)}!"