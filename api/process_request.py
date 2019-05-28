import psycopg2

from flask import jsonify, make_response, request

from db import get_cursor
from auth import permission_check

def count(table_name):
    permissionError = permission_check(table_name, 'mostrar')

    if permissionError:
        response = make_response(jsonify(permissionError), permissionError.get('status', 400))
        response.headers.set('Content-Type', 'application/json; charset=UTF-8')

        return response

    data = {}
    cur = get_cursor()
    query = "SELECT COUNT(*) FROM %s" % table_name

    try:
        cur.execute(query)
    except psycopg2.Error as ex:
        data.update(error=ex.pgerror, status=400)
    else:
        data.update(data=cur.fetchone(), status=200)

    response = make_response(jsonify(data), data.get('status', 400))
    response.headers.set('Content-Type', 'application/json; charset=UTF-8')

    return response

def get(table_name):
    data = {}

    if not table_name:
        data.update(
            error="Bad Request", 
            status=400
        )
        return data

    permissionError = permission_check(table_name, 'mostrar')

    if permissionError:
        return permissionError

    cur = get_cursor()
    args = dict(request.args)

    if 'fields' in args:
        query = "SELECT "
        for field in args['fields'].split(','):
            query += field + ", "

        query = query[:-2] + " FROM %s " % table_name
        del args['fields']

    else:
        query = "SELECT * FROM %s " % table_name

    if args:
        keys = list(args)
        if 'limit' in keys:
            keys.remove('limit')

        if 'offset' in keys:
            keys.remove('offset')

        if keys:
            query += "WHERE "
            for key in keys:
                try:
                    int(args[key])
                except ValueError:
                    query += key + " ilike %(" + key + ")s AND "
                    args[key] = '%' + args[key] + '%'
                else:
                    query += key + " = %(" + key + ")s AND "

            query = query[:-4]

        if 'limit' in args:
            args['limit'] = int(args['limit'])
            query += "LIMIT %(limit)s "

        if  'offset' in args:
            args['offset'] = int(args['offset'])
            query += "OFFSET %(offset)s "

    try:
        cur.execute(query, args)
    except psycopg2.Error as ex:
        data.update(error=ex.pgerror, status=400)
    else:
        data.update(data=cur.fetchall(), status=200)

    return data

def put(table_name, fields):
    data = {}

    if not fields or not table_name:
        data.update(
            error="Bad Request", 
            status=400
        )
        return data

    permissionError = permission_check(table_name, 'crear')

    if permissionError:
        return permissionError

    cur = get_cursor()
    query = "INSERT INTO %s (" % table_name

    for field in fields:
        query += field + ", "

    query = query[:-2] + ") VALUES ("

    for field in fields:
        query += "%(" + field + ")s, "

    query = query[:-2] + ")"

    try:
        cur.execute(query, request.form)
    except psycopg2.Error as ex:
        data.update(error=ex.pgerror, status=400)
    else:
        data.update(data={'message': cur.statusmessage}, status=200)

    return data

def patch(table_name, fields):
    data = {}

    if not fields or not table_name:
        data.update(
            error="Bad Request", 
            status=400
        )
        return data

    permissionError = permission_check(table_name, 'modificar')

    if permissionError:
        return permissionError

    cur = get_cursor()
    query = "UPDATE %s SET " % table_name

    for field in fields:
        query += field + " = %(" + field + ")s, "

    query = query[:-2] + " WHERE id = %s" % request.form['id']

    try:
        cur.execute(query, request.form)
    except psycopg2.Error as ex:
        data.update(error=ex.pgerror, status=400)
    else:
        data.update(data={'message': cur.statusmessage}, status=200)

    return data

def delete(table_name):
    data = {}

    if not table_name:
        data.update(
            error="Bad Request", 
            status=400
        )
        return data

    permissionError = permission_check(table_name, 'eliminar')

    if permissionError:
        return permissionError

    cur = get_cursor()
    query = "DELETE FROM %s WHERE " % table_name
    query += "id = %(id)s"

    try:
        cur.execute(query, request.args)
    except psycopg2.Error as ex:
        data.update(error=ex.pgerror, status=400)
    else:
        data.update(data={'message': cur.statusmessage}, status=200)

    return data
