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
    id                  INT NOT NULL 
        PRIMARY KEY DEFAULT nextval('permiso_id_seq'),
    crear               BOOLEAN NOT NULL DEFAULT FALSE,
    modificar           BOOLEAN NOT NULL DEFAULT FALSE,
    mostrar             BOOLEAN NOT NULL DEFAULT FALSE,
    eliminar            BOOLEAN NOT NULL DEFAULT FALSE,
    condicion           JSON NOT NULL DEFAULT '{}',
    descripcion         VARCHAR NOT NULL,
    nombre              VARCHAR NOT NULL,
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
    descripcion         VARCHAR NOT NULL,
    circulacion         BOOLEAN NOT NULL DEFAULT FALSE
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

INSERT INTO configuracion (nombre, logo, max_prestamos, tiempo_prestamos) 
VALUES
    ('Read More', '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', 1, 7);

INSERT INTO categoria (nombre) 
VALUES 
    ('Ciencias de la Computación, Información y Obras Generales'),
    ('Filosofía y Psicología'),
    ('Religión, Teología'),
    ('Ciencias Sociales'),
    ('Lenguas'),
    ('Ciencias Básicas'),
    ('Tecnología Y Ciencias Aplicadas'),
    ('Artes y recreación'),
    ('Literatura'),
    ('Historia y Geografía');

INSERT INTO estado (descripcion, circulacion) 
VALUES
    ('Prestado', TRUE),
    ('Mantenimiento', TRUE),
    ('Disponible', FALSE);

INSERT INTO persona (nombre, correo) 
VALUES 
    ('Administrador', 'admin@localhost.com');

INSERT INTO permiso(crear, modificar, mostrar, eliminar, descripcion, nombre) 
VALUES
    (TRUE, TRUE, TRUE, TRUE, 'CRUD Colonia', 'colonia'),
    (TRUE, TRUE, TRUE, TRUE, 'CRUD calle', 'calle'),
    (TRUE, TRUE, TRUE, TRUE, 'CRUD Persona', 'persona'),
    (TRUE, TRUE, TRUE, TRUE, 'CRUD Permiso', 'permiso'),
    (TRUE, TRUE, TRUE, TRUE, 'CRUD Grupo Permiso', 'grupo_permiso'),
    (TRUE, TRUE, TRUE, TRUE, 'CRUD Grupo Permiso Permiso Rel', 'grupo_permiso_permiso_rel'),
    (TRUE, TRUE, TRUE, TRUE, 'CRUD Usuario', 'usuario'),
    (TRUE, TRUE, TRUE, TRUE, 'CRUD Zona', 'zona'),
    (TRUE, TRUE, TRUE, TRUE, 'CRUD Editorial', 'editorial'),
    (TRUE, TRUE, TRUE, TRUE, 'CRUD Categoria', 'categoria'),
    (TRUE, TRUE, TRUE, TRUE, 'CRUD Autor', 'autor'),
    (TRUE, TRUE, TRUE, TRUE, 'CRUD Libro', 'libro'),
    (TRUE, TRUE, TRUE, TRUE, 'CRUD Autor Libro Rel', 'autor_libro_rel'),
    (TRUE, TRUE, TRUE, TRUE, 'CRUD Estado', 'estado'),
    (TRUE, TRUE, TRUE, TRUE, 'CRUD Ejemplar', 'ejemplar'),
    (TRUE, TRUE, TRUE, TRUE, 'CRUD Prestamo', 'prestamo'),
    (TRUE, TRUE, TRUE, TRUE, 'CRUD Devolucion', 'devolucion'),
    (TRUE, TRUE, TRUE, TRUE, 'CRUD Multa', 'multa');
    /*(TRUE, TRUE, TRUE, TRUE, 'CRUD ', ''),
    (TRUE, TRUE, TRUE, TRUE, 'CRUD ', ''),
    (TRUE, TRUE, TRUE, TRUE, 'CRUD ', ''),
    (TRUE, TRUE, TRUE, TRUE, 'CRUD ', ''),
    (TRUE, TRUE, TRUE, TRUE, 'CRUD ', ''),
    (TRUE, TRUE, TRUE, TRUE, 'CRUD ', ''),
    (TRUE, TRUE, TRUE, TRUE, 'CRUD ', ''),
    (TRUE, TRUE, TRUE, TRUE, 'CRUD ', ''),*/

INSERT INTO grupo_permiso (nombre) 
VALUES ('Admin');

INSERT INTO grupo_permiso_permiso_rel 
VALUES 
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6),
    (1, 7),
    (1, 8),
    (1, 9),
    (1, 10),
    (1, 11),
    (1, 12),
    (1, 13),
    (1, 14),
    (1, 15),
    (1, 16),
    (1, 17),
    (1, 18);

INSERT INTO usuario (contrasena, id_persona, id_grupo_permiso) 
VALUES 
    ('pbkdf2:sha256:150000$VGQyP4Qy$815717328b949f6c1acfa98b0b663473af25d25239cc9127cca6a992d9aff310', 1, 1);
    
    