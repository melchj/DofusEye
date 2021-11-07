# this is an attempt at a basic blueprint to make a query to the DB...
import functools
from markupsafe import escape

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
# from werkzeug.security import check_password_hash, generate_password_hash

from api.db import get_db

bp = Blueprint('query', __name__, url_prefix='/query')

@bp.route('/<name>', methods=('GET', 'POST'))
def test(name):

    db = get_db()

    result = db.execute(
        """SELECT * FROM perc_prism pp 
        LEFT OUTER JOIN aliases a ON 
        a.character_name LIKE pp.W1_name OR 
        a.character_name LIKE pp.W2_name OR 
        a.character_name LIKE pp.W3_name OR 
        a.character_name LIKE pp.W4_name OR 
        a.character_name LIKE pp.W5_name OR 
        a.character_name LIKE pp.L1_name OR  
        a.character_name LIKE pp.L2_name OR  
        a.character_name LIKE pp.L3_name OR  
        a.character_name LIKE pp.L4_name OR  
        a.character_name LIKE pp.L5_name
        WHERE account_name LIKE ? AND
        NOT channel_id = 862470344798240769;""",
        (name,)
    ).fetchall()
    return f"dofus eye has {len(result)} fights for the account name '{name}'."

# @bp.route('/register', methods=('GET', 'POST'))
# def register():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#         db = get_db()
#         error = None

#         if not username:
#             error = 'Username is required.'
#         elif not password:
#             error = 'Password is required.'

#         if error is None:
#             try:
#                 db.execute(
#                     "INSERT INTO user (username, password) VALUES (?, ?)",
#                     (username, generate_password_hash(password)),
#                 )
#                 db.commit()
#             except db.IntegrityError:
#                 error = f"User {username} is already registered."
#             else:
#                 return redirect(url_for("auth.login"))

#         flash(error)

#     return render_template('auth/register.html')