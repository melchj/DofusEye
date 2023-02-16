from app import create_app
from werkzeug.middleware.proxy_fix import ProxyFix

app = create_app()

# https://flask.palletsprojects.com/en/2.2.x/deploying/proxy_fix/
app.wsgi_app = ProxyFix(
    app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1
)
