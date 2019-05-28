from flask import Blueprint, jsonify, make_response, request
import psycopg2
from werkzeug.security import generate_password_hash

from db import get_db, get_cursor
from auth import session_check, permission_check
import process_request

bp = Blueprint('usuario', __name__, url_prefix='/usuario')

@bp.route('/num', methods=('GET',))
@session_check
def count():
    return process_request.count('usuario')

@bp.route('/', methods=('GET', 'PUT', 'PATCH', 'DELETE'))
@bp.route('', methods=('GET', 'PUT', 'PATCH', 'DELETE'))
@session_check
def usuario():
    method = request.method
    data = {}

    if method == 'GET':
        data = process_request.get('usuario')

    elif method == 'PUT':
        data = put()

    elif method == 'PATCH':
        data = process_request.patch('usuario', ['id_persona', 'id_grupo_permiso'])

    elif method == 'DELETE':
        data = process_request.delete('usuario')

    if data.get('status', 400) == 200:
        get_db().commit()

    response = make_response(jsonify(data), data.get('status', 400))
    response.headers.set('Content-Type', 'application/json; charset=UTF-8')

    return response

def put():
    data = {}

    permissionError = permission_check('usuario', 'modificar')

    if permissionError:
        return permissionError

    args = dict(request.form)

    cur = get_cursor()
    query = """INSERT INTO usuario (contrasena, id_persona, id_grupo_permiso)
        VALUES(%(contrasena)s, %(id_persona)s, %(id_grupo_permiso)s)"""

    args['contrasena'] = generate_password_hash(args['contrasena'])

    try:
        cur.execute(query, args)
    except psycopg2.Error as ex:
        data.update(error=ex.pgerror, status=400)
    else:
        data.update(data={'message': cur.statusmessage}, status=200)

    return data

@bp.route('/changepass', methods=('PATCH',))
@session_check
def changepass():
    data = {}

    if request.method == 'PATCH':
        cur = get_cursor()

        permissionError = permission_check('usuario', 'modificar')

        if permissionError:
            return permissionError

        args = dict(request.form)

        query = """UPDATE usuario 
            SET contrasena = %(contrasena)s 
            WHERE id = %(id)s"""

        args['contrasena'] = generate_password_hash(args['contrasena'])

        try:
            cur.execute(query, args)
        except psycopg2.Error as ex:
            data.update(error=ex.pgerror, status=400)
        else:
            data.update(data={'message': cur.statusmessage}, status=200)

    if data.get('status', 400) == 200:
        get_db().commit()

    response = make_response(jsonify(data), data.get('status', 400))
    response.headers.set('Content-Type', 'application/json; charset=UTF-8')

    return response