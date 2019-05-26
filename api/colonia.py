from flask import Blueprint, jsonify, make_response, request

from db import get_db
from auth import session_check
import process_request

bp = Blueprint('colonia', __name__, url_prefix='/colonia')

@bp.route('/num', methods=('GET',))
@session_check
def count():
    return process_request.count('colonia')

@bp.route('/', methods=('GET', 'PUT', 'PATCH', 'DELETE'))
@bp.route('', methods=('GET', 'PUT', 'PATCH', 'DELETE'))
@session_check
def colonia():
    method = request.method
    data = {}

    if method == 'GET':
        data = process_request.get('colonia')

    elif method == 'PUT':
        data = process_request.put('colonia', ['nombre'])

    elif method == 'PATCH':
        data = process_request.patch('colonia', ['nombre'])

    elif method == 'DELETE':
        data = process_request.delete('colonia')

    if data.get('status', 400) == 200:
        get_db().commit()

    response = make_response(jsonify(data), data.get('status', 400))
    response.headers.set('Content-Type', 'application/json; charset=UTF-8')

    return response