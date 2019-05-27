from flask import Blueprint, jsonify, make_response, request

from db import get_db
from auth import session_check
import process_request

bp = Blueprint('grupo permiso', __name__, url_prefix='/grupo permiso')

@bp.route('/num', methods=('GET',))
@session_check
def count():
    return process_request.count('grupo_permiso')

@bp.route('/', methods=('GET', 'PUT', 'PATCH', 'DELETE'))
@bp.route('', methods=('GET', 'PUT', 'PATCH', 'DELETE'))
@session_check
def grupo_permiso():
    method = request.method
    data = {}

    if method == 'GET':
        data = process_request.get('grupo_permiso')

    elif method == 'PUT':
        data = process_request.put('grupo_permiso', ['nombre'])

    elif method == 'PATCH':
        data = process_request.patch('grupo_permiso', ['nombre'])

    elif method == 'DELETE':
        data = process_request.delete('grupo_permiso')

    if data.get('status', 400) == 200:
        get_db().commit()

    response = make_response(jsonify(data), data.get('status', 400))
    response.headers.set('Content-Type', 'application/json; charset=UTF-8')

    return response