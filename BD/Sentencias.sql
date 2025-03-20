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

-- generar datos semillas para comercintes
INSERT INTO comerciante (nombre, municipio, telefono, correo, fecha_registro, estado, userid) VALUES
('Ricardo Arias', 'Medellin', '3003003030', 'r.arias@exito.com', '2000-01-15 10:00:00', 'activo', 1),
('David Velez', 'Medellin', '3003003030', 'info@nu.com', '2023-02-10 11:30:00', 'activo', 2),
('Deiby Vega', 'Bogota', '3003003030', 'contacto@platzi.com', '2020-03-05 09:45:00', 'activo', 1),
('OLS&D', 'Cali', '3003003030', 'ventas@ols.com', '2002-03-20 14:15:00', 'inactivo', 2),
('Rappi', 'Cali', '3003003030', 'soporte@rappi.com', '2024-04-01 16:00:00', 'activo', 1);