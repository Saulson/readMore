import psycopg2

from flask import Blueprint, current_app, jsonify, make_response, request

from db import get_db, get_cursor
from auth import session_check

bp = Blueprint('editorial', __name__, url_prefix='/editorial')

@bp.route('/', methods=('GET', 'PUT', 'PATCH', 'DELETE'))
@bp.route('', methods=('GET', 'PUT', 'PATCH', 'DELETE'))
@session_check
def editorial():
    method = request.method
    data = {}

    if method == 'GET':
        data = get()

    elif method == 'PUT':
        data = put()

    elif method == 'PATCH':
        data = patch()

    elif method == 'DELETE':
        data = delete()

    if data.get('status', 400) == 200:
        get_db().commit()

    response = make_response(jsonify(data), data.get('status', 400))
    response.headers.set('Content-Type', 'application/json; charset=UTF-8')

    return response

def get():
    data = {}
    cur = get_cursor()
    query = "SELECT * FROM editorial "
    if request.args:
        query += "WHERE "
        for key in request.args:
            query += key + " = %(" + key + ")s AND "

        query = query[:-4]

    try:

        cur.execute(query, request.args)
    except psycopg2.Error as ex:
        data.update(error=ex.pgerror, status=400)
    else:
        data.update(data=cur.fetchall(), status=200)

    return data

def put():
    data = {}
    cur = get_cursor()

    try:
        cur.execute("INSERT INTO editorial (nombre) VALUES (%(nombre)s)", request.form)
    except psycopg2.Error as ex:
        data.update(error=ex.pgerror, status=400)
    else:
        data.update(data={'message': cur.statusmessage}, status=200)

    return data

def patch():
    data = {}
    cur = get_cursor()

    try:
        cur.execute("UPDATE editorial SET nombre = %(nombre)s WHERE id = %(id)s", request.form)
    except psycopg2.Error as ex:
        data.update(error=ex.pgerror, status=400)
    else:
        data.update(data={'message': cur.statusmessage}, status=200)

    return data

def delete():
    data = {}
    cur = get_cursor()

    try:
        cur.execute("DELETE FROM editorial WHERE id = %(id)s", request.args)
    except psycopg2.Error as ex:
        data.update(error=ex.pgerror, status=400)
    else:
        data.update(data={'message': cur.statusmessage}, status=200)

    return data
