from flask import Blueprint, jsonify, make_response, request

from db import get_db, get_cursor
from auth import session_check, permission_check
import process_request

bp = Blueprint('configuracion', __name__, url_prefix='/configuracion')

@bp.route('/', methods=('GET', 'PATCH'))
@bp.route('', methods=('GET', 'PATCH'))
@session_check
def configuracion():
    method = request.method
    data = {}

    if method == 'GET':
        data = process_request.get('configuracion')
        if data.get('status', 400) == 200 and data['data']:
            data['data'][0]['logo'] = str(data['data'][0]['logo'].tobytes())[2:-1].replace('+', '%2B')


    elif method == 'PATCH':
        permissionError = permission_check('configuracion', 'modificar')

        if permissionError:
            response = make_response(jsonify(permissionError), permissionError.get('status', 400))
            response.headers.set('Content-Type', 'application/json; charset=UTF-8')

            return response

        cur = get_cursor()
        query = """UPDATE configuracion 
            SET nombre = %(nombre)s,
            logo = %(logo)s,
            max_prestamos = %(max_prestamos)s,
            tiempo_prestamos= %(tiempo_prestamos)s"""

        try:
            cur.execute(query, request.form)
        except psycopg2.Error as ex:
            data.update(error=ex.pgerror, status=400)
        else:
            data.update(data={'message': cur.statusmessage}, status=200)

    if data.get('status', 400) == 200:
        get_db().commit()

    response = make_response(jsonify(data), data.get('status', 400))
    response.headers.set('Content-Type', 'application/json; charset=UTF-8')

    return response