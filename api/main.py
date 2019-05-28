from flask import Flask

import auth
import autor
import calle
import categoria
import colonia
import configuracion
import editorial
import ejemplar
import estado
import grupo_permiso
import libro
import permiso
import persona
import prestamo
import tools
import usuario
import zona

api = Flask(__name__)
api.config.from_mapping(
    SECRET_KEY='R43d3m0r3.#',
    DATABASE='readmore',
    DATABASE_PASS='R43d3m0r3.#'
)

api.register_blueprint(auth.bp)
api.register_blueprint(autor.bp)
api.register_blueprint(calle.bp)
api.register_blueprint(categoria.bp)
api.register_blueprint(colonia.bp)
api.register_blueprint(configuracion.bp)
api.register_blueprint(editorial.bp)
api.register_blueprint(ejemplar.bp)
api.register_blueprint(estado.bp)
api.register_blueprint(grupo_permiso.bp)
api.register_blueprint(libro.bp)
api.register_blueprint(permiso.bp)
api.register_blueprint(persona.bp)
api.register_blueprint(prestamo.bp)
api.register_blueprint(tools.bp)
api.register_blueprint(usuario.bp)
api.register_blueprint(zona.bp)

if __name__ == '__main__':
    api.run()