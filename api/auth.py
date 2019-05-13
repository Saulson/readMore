import functools

from flask import Blueprint, g, request, session
from werkzeug.security import check_password_hash, generate_password_hash

from db import get_cursor

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/login', methods=('GET', 'POST'))
def login():
    if request == 'POST':
        username = request.form['user']
        password = request.form['password']

        cur = get_cursor()
        error = None

        cur.execute("""
            SELECT id, contrasena FROM usuario WHERE id = %s
        """, (username,))

        user = cur.fetchone()

        if user is None:
            error = "Incorrect Username"
        elif not check_password_hash(user['contrasena'], password):
            error = "Incorrect Password"

        if error is None:
            session.clear()
            session['user_id'] = user['id']
            return "EXITO!!!"
        else:
            return error

    return "HEY!"

def session_check(funct):
    @functools.wraps(funct)
    def wrapper(**kwargs):
        if g.user is None:
            return "Error"

        return funct(**kwargs)

    return wrapper