import psycopg2
from psycopg2.extras import RealDictCursor

from flask import current_app, g


def get_db():
    if 'db' not in g:
        g.db = psycopg2.connect(host='db', 
            database=current_app.config['DATABASE'],
            user='readmore', password=current_app.config['DATABASE_PASS'])

    return g.db

def get_cursor():
    if 'cursor' not in g:
        g.cursor = get_db().cursor(cursor_factory=RealDictCursor)

    return g.cursor

def close_db():
    db = g.pop('db', None)

    if db is not None:
        db.close()

def close_cursor():
    cursor = g.pop('cursor', None)

    if cursor is not None:
        cursor.close()    