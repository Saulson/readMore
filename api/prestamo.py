from flask import Blueprint, jsonify, make_response, request

from db import get_db
from auth import session_check
import process_request

bp = Blueprint('prestamo', __name__, url_prefix='/prestamo')

@bp.route('/num', methods=('GET',))
@session_check
def count():
    return process_request.count('prestamo')

@bp.route('/', methods=('GET', 'PUT', 'PATCH', 'DELETE'))
@bp.route('', methods=('GET', 'PUT', 'PATCH', 'DELETE'))
@session_check
def prestamo():
    method = request.method
    data = {}

    if method == 'GET':
        data = process_request.get('prestamo')

    elif method == 'PUT':
        data = process_request.put('prestamo', ['fecha_prestamo', 
            'fecha_devolucion', 'id_ejemplar', 'id_lector', 'id_empleado'])

    elif method == 'PATCH':
        data = process_request.patch('prestamo', ['fecha_prestamo', 
            'fecha_devolucion', 'id_ejemplar', 'id_lector', 'id_empleado'])

    elif method == 'DELETE':
        data = process_request.delete('prestamo')

    if data.get('status', 400) == 200:
        get_db().commit()

    response = make_response(jsonify(data), data.get('status', 400))
    response.headers.set('Content-Type', 'application/json; charset=UTF-8')

    return response