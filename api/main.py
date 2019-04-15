from flask import Flask, request, make_response, jsonify
from mysql import connector

api = Flask(__name__)

@api.route('/')
def main():
    return "BienVENIDO a la API"

if __name__ == '__main__':
    api.run(debug=True)