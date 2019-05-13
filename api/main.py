from flask import Flask

import auth
import tools

api = Flask(__name__)
api.config.from_mapping(
    SECRET_KEY='R43d3m0r3.#',
    DATABASE='readmore'
)

api.register_blueprint(auth.bp)
api.register_blueprint(tools.bp)


if __name__ == '__main__':
    api.run()