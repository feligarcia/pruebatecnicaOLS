-- Sentencias

-- Definir enums
CREATE TYPE rol_usuario AS ENUM ('administrador', 'auxiliar');
CREATE TYPE estado_comerciante AS ENUM ('activo', 'inactivo');

-- Creando las tablas de usuario, comerciante, establecimiento
CREATE TABLE usuario (userid SERIAL PRIMARY KEY, nombre VARCHAR(255) NOT NULL, correo VARCHAR(255) NOT NULL, contrasena VARCHAR(255) NOT NULL, rol rol_usuario NOT NULL);
CREATE TABLE comerciante (comid SERIAL PRIMARY KEY, nombre VARCHAR(255) NOT NULL, municipio VARCHAR(255) NOT NULL, telefono VARCHAR(255), correo VARCHAR(255), fecha_registro TIMESTAMP NOT NULL, estado estado_comerciante NOT NULL, fecha_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, userid INTEGER NOT NULL, FOREIGN KEY (userid) REFERENCES usuario(userid) ON DELETE SET NULL);
CREATE TABLE establecimiento (estid SERIAL PRIMARY KEY, nombre VARCHAR(255) NOT NULL, ingresos DECIMAL(20,2) NOT NULL, numempleados INT NOT NULL, comid INT NOT NULL, fecha_actualizacion NOT NULL TIMESTAMP DEFAULT CURRENT_TIMESTAMP, userid INT NOT NULL, FOREIGN KEY (comid) REFERENCES comerciante(comid), FOREIGN KEY (userid) REFERENCES usuario(userid) ON DELETE SET NULL);

--DEFINIR TRIGGER PARA ACTUALIZAR


-- generar datos usuarios
INSERT INTO usuario (nombre, correo, contrasena, rol) VALUES
('Juan Felipe', 'juan.felipe@gmail.com', 'felipe123', 'administrador'),
('Martin Garcia', 'm.garcia@hotmail.com', 'magar123', 'auxiliar');

