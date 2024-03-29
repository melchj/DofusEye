from functools import wraps
from flask import Response, request
# from app.database.database import Fight, Alias

def require_token(func):
    @wraps(func)
    def check_token(*args, **kwargs):
        # get the auth token and decode it
        # TODO: allow token to be part of url query string too
        auth_token = request.headers.get('Authorization')
        if auth_token:
            # TODO: i'm not sure why, but i have to import this here rather than at top of file to avoid InputError. need to learn about this...
            from app.database.database import User
            resp = User.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                return func(*args, **kwargs)
            else:
                return Response(resp, status=401)
        else:
            return Response('must provide authentication token.', status=401)
    
    return check_token

def require_admin_token(func):
    @wraps(func)
    def check_token(*args, **kwargs):
        # get the auth token and decode it
        auth_token = request.headers.get('Authorization')
        if auth_token:
            from app.database.database import User
            resp = User.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                user = User.query.filter_by(id=resp).first()
                if user.admin:
                    return func(*args, **kwargs)
                else:
                    return Response('Request failed. Admin access required.', status=403)
            else:
                return Response(resp, status=401)
        else:
            return Response('must provide authentication token.', status=401)
    
    return check_token