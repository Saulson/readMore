from flask import Flask

import auth
import calle
import colonia
import editorial
import grupo_permiso
import tools
import zona

api = Flask(__name__)
api.config.from_mapping(
    SECRET_KEY='R43d3m0r3.#',
    DATABASE='readmore',
    DATABASE_PASS='R43d3m0r3.#'
)

api.register_blueprint(auth.bp)
api.register_blueprint(calle.bp)
api.register_blueprint(colonia.bp)
api.register_blueprint(editorial.bp)
api.register_blueprint(grupo_permiso.bp)
api.register_blueprint(tools.bp)
api.register_blueprint(zona.bp)

if __name__ == '__main__':
    api.run()