from flask import Flask

import auth
import tools
import editorial

api = Flask(__name__)
api.config.from_mapping(
    SECRET_KEY='R43d3m0r3.#',
    DATABASE='readmore',
    DATABASE_PASS='R43d3m0r3.#'
)

api.register_blueprint(auth.bp)
api.register_blueprint(tools.bp)
api.register_blueprint(editorial.bp)


if __name__ == '__main__':
    api.run()