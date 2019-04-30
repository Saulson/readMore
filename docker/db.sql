CREATE TABLE configuracion (
    nombre              VARCHAR NOT NULL,
    logo                BYTEA NOT NULL,
    max_prestamos       INT NOT NULL,
    tiempo_prestamos    INT NOT NULL
);

CREATE SEQUENCE colonia_id_seq;
CREATE TABLE colonia (
    id                  INT NOT NULL 
        PRIMARY KEY DEFAULT nextval('colonia_id_seq'),
    nombre              VARCHAR NOT NULL
);

CREATE SEQUENCE calle_id_seq;
CREATE TABLE calle (
    id                  INT NOT NULL 
        PRIMARY KEY DEFAULT nextval('calle_id_seq'),
    nombre VARCHAR NOT NULL
);

CREATE SEQUENCE persona_id_seq;
CREATE TABLE persona (
    id                  INT NOT NULL 
        PRIMARY KEY DEFAULT nextval('persona_id_seq'),
    nombre              VARCHAR NOT NULL,
    apeidoM             VARCHAR,
    apeidoP             VARCHAR,
    correo              VARCHAR NOT NULL,
    telefono            VARCHAR,
    id_colonia          INT
        REFERENCES colonia(id)
        ON DELETE RESTRICT,
    id_calle            INT
        REFERENCES calle(id) 
        ON DELETE RESTRICT,
    numero              INT
);

CREATE SEQUENCE permiso_id_seq;
CREATE TABLE permiso (
    ID                  INT NOT NULL 
        PRIMARY KEY DEFAULT nextval('permiso_id_seq'),
    crear               BOOLEAN NOT NULL DEFAULT FALSE,
    modificar           BOOLEAN NOT NULL DEFAULT FALSE,
    mostrar             BOOLEAN NOT NULL DEFAULT FALSE,
    eliminar            BOOLEAN NOT NULL DEFAULT FALSE,
    condicion           JSON NOT NULL DEFAULT '{}',
    descripcion         VARCHAR NOT NULL
);

CREATE SEQUENCE grupo_permiso_id_seq;
CREATE TABLE grupo_permiso (
    id                  INT NOT NULL 
        PRIMARY KEY DEFAULT nextval('grupo_permiso_id_seq'),
    nombre              VARCHAR NOT NULL
);

CREATE TABLE grupo_permiso_permiso_rel (
    id_grupo_permiso    INT NOT NULL
        REFERENCES grupo_permiso(id)
        ON DELETE RESTRICT,
    id_permiso          INT NOT NULL
        REFERENCES permiso(id)
        ON DELETE RESTRICT
);

CREATE SEQUENCE usuario_id_seq;
CREATE TABLE usuario (
    id                  INT NOT NULL 
        PRIMARY KEY DEFAULT nextval('usuario_id_seq'),
    contrasena          VARCHAR NOT NULL,
    id_persona          INT NOT NULL
        REFERENCES persona(id)
        ON DELETE RESTRICT,
    id_grupo_permiso    INT NOT NULL
        REFERENCES grupo_permiso(id)
        ON DELETE RESTRICT
);

CREATE SEQUENCE zona_id_seq;
CREATE TABLE zona (
    id                  INT NOT NULL 
        PRIMARY KEY DEFAULT nextval('zona_id_seq'),
    nombre              VARCHAR NOT NULL,
    foto                BYTEA
);

CREATE SEQUENCE editorial_id_seq;
CREATE TABLE editorial (
    id                  INT NOT NULL 
        PRIMARY KEY DEFAULT nextval('editorial_id_seq'),
    nombre              VARCHAR NOT NULL
);

CREATE SEQUENCE categoria_id_seq;
CREATE TABLE categoria (
    id                  INT NOT NULL 
        PRIMARY KEY DEFAULT nextval('categoria_id_seq'),
    nombre              VARCHAR NOT NULL
);

CREATE SEQUENCE autor_id_seq;
CREATE TABLE autor (
    id                  INT NOT NULL 
        PRIMARY KEY DEFAULT nextval('autor_id_seq'),
    nombre              VARCHAR NOT NULL,
    apeidoP             VARCHAR,
    apeidoM             VARCHAR
);

CREATE SEQUENCE libro_id_seq;
CREATE TABLE libro (
    id                  INT NOT NULL 
        PRIMARY KEY DEFAULT nextval('libro_id_seq'),
    titulo              VARCHAR NOT NULL,
    isbn                VARCHAR NOT NULL,
    portada             BYTEA,
    id_categoria        INT NOT NULL 
        REFERENCES categoria(id)
        ON DELETE RESTRICT,
    id_editorial        INT NOT NULL
        REFERENCES editorial(id)
        ON DELETE RESTRICT,
    id_zona             INT NOT NULL
        REFERENCES zona(id)
        ON DELETE RESTRICT
);

CREATE TABLE autor_libro_rel (
    id_autor            INT NOT NULL
        REFERENCES autor(id)
        ON DELETE RESTRICT,
    id_libro            INT NOT NULL
        REFERENCES libro(id)
        ON DELETE RESTRICT
);

CREATE SEQUENCE estado_id_seq;
CREATE TABLE estado (
    id                  INT NOT NULL 
        PRIMARY KEY DEFAULT nextval('estado_id_seq'),
    descripcion         VARCHAR NOT NULL
);

CREATE SEQUENCE ejemplar_id_seq;
CREATE TABLE ejemplar (
    id                  INT NOT NULL 
        PRIMARY KEY DEFAULT nextval('ejemplar_id_seq'),
    num_ejemplar        INT NOT NULL,
    comentario          VARCHAR,
    id_libro            INT NOT NULL
        REFERENCES libro(id)
        ON DELETE RESTRICT,
    id_estado           INT NOT NULL
        REFERENCES estado(id)
        ON DELETE RESTRICT
);

CREATE SEQUENCE prestamo_id_seq;
CREATE TABLE prestamo (
    id                  INT NOT NULL 
        PRIMARY KEY DEFAULT nextval('prestamo_id_seq'),
    fecha_prestamo      DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_devolucion    DATE NOT NULL,
    id_ejemplar         INT NOT NULL
        REFERENCES ejemplar(id)
        ON DELETE RESTRICT,
    id_lector           INT NOT NULL
        REFERENCES usuario(id)
        ON DELETE RESTRICT,
    id_empleado         INT NOT NULL
        REFERENCES usuario(id)
        ON DELETE RESTRICT
);

CREATE SEQUENCE devolucion_id_seq;
CREATE TABLE devolucion (
    id                  INT NOT NULL
        PRIMARY KEY DEFAULT nextval('devolucion_id_seq'),
    fecha_devolucion    DATE NOT NULL DEFAULT CURRENT_DATE,
    id_prestamo         INT NOT NULL UNIQUE
        REFERENCES prestamo(id)
        ON DELETE RESTRICT,
    id_empleado         INT NOT NULL
        REFERENCES usuario(id)
        ON DELETE RESTRICT
);

CREATE SEQUENCE multa_id_seq;
CREATE TABLE multa (
    id                  INT NOT NULL 
        PRIMARY KEY DEFAULT nextval('multa_id_seq'),
    importe             NUMERIC NOT NULL CHECK(importe > 0.0),
    id_devolucion       INT NOT NULL UNIQUE
        REFERENCES devolucion(id)
        ON DELETE RESTRICT
);
