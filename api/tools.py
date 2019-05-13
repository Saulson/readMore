from flask import Blueprint, jsonify, g, make_response, request, session
import psycopg2
import base64

from db import get_cursor


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