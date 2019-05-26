import psycopg2

from flask import Blueprint, jsonify, make_response, request

from db import get_db
from auth import session_check
import process_request

bp = Blueprint('editorial', __name__, url_prefix='/editorial')

@bp.route('/num', methods=('GET',))
@session_check
def count():
    return process_request.count('editorial')

@bp.route('/', methods=('GET', 'PUT', 'PATCH', 'DELETE'))
@bp.route('', methods=('GET', 'PUT', 'PATCH', 'DELETE'))
@session_check
def editorial():
    method = request.method
    data = {}

    if method == 'GET':
        data = process_request.get('editorial')

    elif method == 'PUT':
        data = process_request.put('editorial', ['nombre'])

    elif method == 'PATCH':
        data = process_request.patch('editorial', ['nombre'])

    elif method == 'DELETE':
        data = process_request.delete('editorial')

    if data.get('status', 400) == 200:
        get_db().commit()

    response = make_response(jsonify(data), data.get('status', 400))
    response.headers.set('Content-Type', 'application/json; charset=UTF-8')

    return response