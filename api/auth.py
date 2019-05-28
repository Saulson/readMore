import functools
import psycopg2

from flask import Blueprint, jsonify, g, make_response, request, session
from werkzeug.security import check_password_hash, generate_password_hash

from db import get_cursor

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/login', methods=('POST',))
def login():
    data = {}
    if request.method == 'POST':
        cur = get_cursor()

        try:
            cur.execute("""
                SELECT id, contrasena FROM usuario WHERE id = %(id)s
            """, request.form)
        except psycopg2.Error as ex:
            data.update(error=ex.pgerror, status=400)
        else:
            user = cur.fetchone()
            if user is None:
                data.update(error="El usuario no existe", status=400)
            elif not check_password_hash(user['contrasena'], request.form['contrasena']):
                data.update(error="Contraseña Incorrecta", status=400)
            else:
                session.clear()
                session['user_id'] = user['id']
                data.update(data=None, status=200)

    response = make_response(jsonify(data), data.get('status', 400))
    response.headers.set('Content-Type', 'application/json; charset=UTF-8')
    return response

@bp.route('/usuario', methods=('GET',))
def usuario():
    data = {}

    if 'user_id' in session:
        data.update(data={'id': session['user_id']}, status=200)
    else:
        data.update(data=None, status=401)

    response = make_response(jsonify(data), data.get('status', 400))
    response.headers.set('Content-Type', 'application/json; charset=UTF-8')
    return response

@bp.route('/logout', methods=('GET',))
def logout():
    session.clear()

    response = make_response(jsonify(None), 200)
    response.headers.set('Content-Type', 'application/json; charset=UTF-8')
    return response

@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        cur = get_cursor()
        cur.execute("SELECT * FROM usuario WHERE id = %s", (user_id,))
        g.user = cur.fetchone()

def session_check(funct):
    @functools.wraps(funct)
    def wrapper(**kwargs):
        if 'user_id' not in session:
            response = make_response(jsonify(None), 401)
            response.headers.set('Content-Type', 'application/json; charset=UTF-8')
            return response

        return funct(**kwargs)

    return wrapper