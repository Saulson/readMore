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
        try:
            cur.execute("SELECT * FROM usuario WHERE id = %s", (user_id,))
        except psycopg2.Error as ex:
            pass
        else:
            g.user = cur.fetchone()

def session_check(funct):
    @functools.wraps(funct)
    def wrapper(**kwargs):
        if 'user_id' not in session:
            response = make_response(jsonify({
                'error': "No se encontró ninguna session activa", 
                'status': 401
            }), 401)
            response.headers.set('Content-Type', 'application/json; charset=UTF-8')
            return response

        return funct(**kwargs)

    return wrapper

def permission_check(table, operation):
    if operation not in ['crear', 'mostrar', 'modificar', 'eliminar']:
        pass #TODO

    res = False
    query = """
        SELECT COALESCE(p.%s, FALSE) AS res
        FROM permiso AS p, 
        grupo_permiso_permiso_rel AS gpr, 
        grupo_permiso AS g, 
        usuario AS u 
        WHERE p.id = gpr.id_permiso AND 
        gpr.id_grupo_permiso = g.id AND 
        g.id = u.id_grupo_permiso AND
    """ % operation

    query += "p.nombre = %s AND u.id = %s LIMIT 1"

    cur = get_cursor()

    try:
        cur.execute(query, (table, session['user_id']))
    except psycopg2.Error as ex:
        return {
            'error': ex.pgerror, 
            'status': 400
        }
    else:
        res = cur.fetchone()
        res = res['res'] if res else False

    if not res:
        return {
            'error': "No puede %s en la tabla %s" % (operation, table), 
            'status': 401
        }

    return {}

