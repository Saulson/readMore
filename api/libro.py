from flask import Blueprint, jsonify, make_response, request

from db import get_db
from auth import session_check
import process_request

bp = Blueprint('libro', __name__, url_prefix='/libro')

@bp.route('/num', methods=('GET',))
@session_check
def count():
    return process_request.count('libro')

@bp.route('/', methods=('GET', 'PUT', 'PATCH', 'DELETE'))
@bp.route('', methods=('GET', 'PUT', 'PATCH', 'DELETE'))
@session_check
def libro():
    method = request.method
    data = {}

    if method == 'GET':
        data = process_request.get('libro')
        if data.get('status', 400) == 200 and 'fields' not in request.args or 'portada' in request.args.get('fields', {}):
            for d in data['data']:
                d['portada'] = str(d['portada'].tobytes())[2:-1].replace('+', '%2B')

    elif method == 'PUT':
        data = process_request.put('libro', ['titulo', 'isbn', 'portada', 
            'id_categoria', 'id_editorial', 'id_zona'])

    elif method == 'PATCH':
        data = process_request.patch('libro', ['titulo', 'isbn', 'portada', 
            'id_categoria', 'id_editorial', 'id_zona'])

    elif method == 'DELETE':
        data = process_request.delete('libro')

    if data.get('status', 400) == 200:
        get_db().commit()

    response = make_response(jsonify(data), data.get('status', 400))
    response.headers.set('Content-Type', 'application/json; charset=UTF-8')

    return response