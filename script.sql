CREATE DATABASE semillero_sas;
USE semillero_sas;

CREATE TABLE marcas (
    id INT UNSIGNED AUTO_INCREMENT NOT NULL, 
    nombre VARCHAR(30) NOT NULL,
    descripcion TEXT NOT NULL,
    marca_activa ENUM('si','no') NOT NULL,
    CONSTRAINT `pk_id_marca` PRIMARY KEY(id)
);
ALTER TABLE marcas ADD CONSTRAINT `unique_nombre_marca` UNIQUE(nombre);

CREATE TABLE lineas (
    id INT UNSIGNED AUTO_INCREMENT NOT NULL, 
    nombre VARCHAR(30) NOT NULL,
    descripcion TEXT NOT NULL,
    linea_activa ENUM('si','no') NOT NULL,
    id_marca INT UNSIGNED NOT NULL,
    CONSTRAINT `pk_id_linea` PRIMARY KEY(id),
    CONSTRAINT `fk_id_marca` FOREIGN KEY (id_marca) REFERENCES marcas(id)
);

CREATE TABLE vehiculos (
    placa VARCHAR(6) NOT NULL,
    modelo YEAR NOT NULL,
    venc_seguro DATE NOT NULL,
    venc_tecnicomecanica DATE NOT NULL,
    color VARCHAR(20),
    id_linea INT UNSIGNED NOT NULL,
    CONSTRAINT `pk_placa` PRIMARY KEY(placa),
    CONSTRAINT `fk_id_linea` FOREIGN KEY (id_linea) REFERENCES lineas(id)
);

ALTER TABLE vehiculos ADD CONSTRAINT `unique_placa` UNIQUE(placa);


/*CONSULTAS*/

/*Modelo menor*/
SELECT modelo FROM vehiculos ORDER BY modelo LIMIT 1;

/*Modelo mayor*/
SELECT MAX(modelo) FROM vehiculos;

/*Rangos de Fechas de vencimiento del seguro*/
SELECT * FROM vehiculos WHERE venc_seguro BETWEEN '20220815' AND '20221109';

/*Rangos de modelo de vehiculos*/
SELECT * FROM vehiculos WHERE modelo BETWEEN '2010' AND '2018';

/*Consulta de la placa, modelo descripcion de la linea y descripción del modelo (linea este activa)*/
SELECT placa, modelo, L.descripcion AS 'Descripcion de Linea', M.descripcion AS 'Descripcion de Marca' FROM vehiculos V 
    JOIN lineas L ON V.id_linea = L.id
    JOIN marcas M ON L.id = M.id
        WHERE L.linea_activa = 'si';

/*Suma de los modelos*/
SELECT SUM(modelo) AS 'Suma de modelos' FROM vehiculos;

/*promedio de los modelos*/
SELECT AVG(modelo) AS 'Promedio de modelos' FROM vehiculos;

/*Lineas activas e inactivas*/
SELECT CASE WHEN linea_activa = 'si' THEN COUNT(linea_activa) ELSE 0 END AS Activos, 
        CASE WHEN linea_activa = 'no' THEN COUNT(linea_activa) ELSE 0 END AS Inactivos
            FROM lineas;

SELECT CASE WHEN linea_activa = "no" THEN 1 ELSE 0 END AS Inactivos, 
        CASE WHEN linea_activa = "si" THEN 1 ELSE 0 END AS Activos
            FROM lineas;

SELECT COUNT(linea_activa) AS Activos FROM lineas WHERE linea_activa = "si";
SELECT COUNT(linea_activa) AS Inactivos FROM lineas WHERE linea_activa = "no";

SELECT COUNT(linea_activa) AS Activos, COUNT(linea_activa) AS Inactivos FROM lineas
    WHERE 

/*Respuesta!!*/
SELECT COUNT(linea_activa), linea_activa FROM lineas GROUP BY linea_activa;
