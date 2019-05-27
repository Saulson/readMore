from flask import Blueprint, jsonify, g, make_response, request, session
import psycopg2
import base64

from db import get_cursor
from auth import session_check


bp = Blueprint('tool', __name__, url_prefix='/tool')

@bp.route('/logo', methods=('GET',))
def logo():
    cur = get_cursor()
    try:
        cur.execute("SELECT logo FROM configuracion LIMIT 1")
    except psycopg2.Error as ex:
        response = make_response(jsonify({'error': ex.pgerror, 'status': 400}), 400)
        response.headers.set('Content-Type', 'application/json; charset=UTF-8')
        return response


    image_binary = base64.b64decode(cur.fetchone()['logo'])
    response = make_response(image_binary, 200)
    response.headers.set('Content-Type', 'image/png')

    return response

@bp.route('/nombre', methods=('GET',))
def name():
    data = {}
    cur = get_cursor()

    try:
        cur.execute("SELECT nombre FROM configuracion LIMIT 1")
    except psycopg2.Error as ex:
        data.update(error=ex.pgerror, status=400)
    else:
        data.update(data={'nombre': cur.fetchone()['nombre']}, status=200)

    response = make_response(jsonify(data), data['status'])
    response.headers.set('Content-Type', 'application/json; charset=UTF-8')
    return response

@bp.route('/menu', methods=('GET',))
def menu():
    data = {}
    cur = get_cursor()
    user_id = session.get('user_id')
    id_param = request.args.get('id')

    try:
        if not user_id or not id_param or str(user_id) != str(id_param):
            raise Exception("")

        cur.execute("""
            SELECT DISTINCT(p.nombre) 
            FROM permiso AS p, 
            grupo_permiso_permiso_rel AS gpr, 
            grupo_permiso AS g, 
            usuario AS u 
            WHERE p.id = gpr.id_permiso AND 
            gpr.id_grupo_permiso = g.id AND 
            g.id = u.id_grupo_permiso AND
            p.mostrar = TRUE AND 
            p.nombre NOT LIKE '%%_rel' AND
            u.id = %s;
        """, [id_param])
    except psycopg2.Error as ex:
        data.update(error=ex.pgerror, status=400)
    except Exception as ex:
        data.update(data=[], status=200)
    else:
        data.update(data=cur.fetchall(), status=200)

        for menu in data['data']:
            menu['nombre'] = menu['nombre'].replace('_', ' ')

    response = make_response(jsonify(data), data['status'])
    response.headers.set('Content-Type', 'application/json; charset=UTF-8')

    return response

@bp.route('/img/<model>/<field>/<int:res_id>', methods=('GET',))
@session_check
def img(model, field, res_id):
    data = {}
    cur = get_cursor()

    query = "SELECT %s FROM %s " % (field, model)
    query += "WHERE id = %s"

    try:
        cur.execute(query, (res_id,))
    except psycopg2.Error as ex:
        response = make_response(jsonify({'error': ex.pgerror, 'status': 400}), 400)
        response.headers.set('Content-Type', 'application/json; charset=UTF-8')
        return response

    image = cur.fetchone()
    if image:
        image_binary = base64.b64decode(image[field])
        response = make_response(image_binary, 200)
        response.headers.set('Content-Type', 'image/png')
    else:
        response = make_response(jsonify({'error': "No se encontro la imagen", 'status': 400}), 400)
        response.headers.set('Content-Type', 'application/json; charset=UTF-8')

    return response

@bp.route('tables', methods=('GET',))
@session_check
def tables():
    data = {}
    cur = get_cursor()

    query = """SELECT table_name AS table
        FROM information_schema.tables
        WHERE table_type='BASE TABLE'
        AND table_schema='public'"""

    try:
        cur.execute(query)
    except psycopg2.Error as ex:
        data.update(error=ex.pgerror, status=400)
    else:
        data.update(data=[row['table'] for row in cur.fetchall()], status=200)

    response = make_response(jsonify(data), data.get('status', 400))
    response.headers.set('Content-Type', 'application/json; charset=UTF-8')

    return response

