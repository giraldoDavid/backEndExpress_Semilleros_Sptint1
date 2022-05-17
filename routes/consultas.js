const { Router } = require("express");
const router = Router();
const connection = require('../dataBase/dataBase');

// Modelo maximo almacenado
router.get('/consulta/maxmodelo', async (req, res) =>{
    
    try {
        const [maxmodelo] = await connection.query(`SELECT MAX(modelo) 'maxModelo' FROM vehiculos;`);
        return res.status(201).json(maxmodelo);
        
    } catch (error) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Modelo minimo almacenado
router.get('/consulta/minmodelo', async (req, res) =>{
    
    try {
        const [minmodelo] = await connection.query(`SELECT modelo 'minModelo' FROM vehiculos ORDER BY modelo LIMIT 1;`);
        return res.status(201).json(minmodelo);
        
    } catch (error) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// vehículos según el rango de fecha del seguro
// router.get('/consulta/entre-fechas-seguro', async (req, res) =>{
    
//     try {
//         const { minFecha, maxFecha } = req.body;
//         const [fecha] = await connection.query(`SELECT * FROM vehiculos WHERE venc_seguro BETWEEN '${minFecha}' AND '${maxFecha}';`);
//         return res.status(201).json(fecha);
        
//     } catch (error) {
//         console.log(err);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// vehículos según el rango de fecha del seguro
router.get('/consulta/entre-fechas-seguro/:fecha1/:fecha2', async (req, res) =>{
    
    try {

        const {fecha1, fecha2} = req.params;

        const [fecha] = await connection.query(`SELECT * FROM vehiculos WHERE venc_seguro BETWEEN '${fecha1}' AND '${fecha2}' ORDER BY venc_seguro;`);
        return res.status(201).json(fecha);
        
    } catch (error) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});




// vehículos según el rango de modelo
// router.get('/consulta/entre-modelos', async (req, res) =>{
    
//     try {
//         const { minModelo, maxModelo } = req.body;
//         const [modelo] = await connection.query(`SELECT * FROM vehiculos WHERE modelo BETWEEN '${minModelo}' AND '${maxModelo}';`);
//         return res.status(201).json(modelo);
        
//     } catch (error) {
//         console.log(err);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// vehículos según el rango de modelo
router.get('/consulta/entre-modelos/:fecha1/:fecha2', async (req, res) =>{
    
    try {
        const { fecha1, fecha2 } = req.params;
        const [modelo] = await connection.query(`SELECT * FROM vehiculos WHERE modelo BETWEEN '${fecha1}' AND '${fecha2}' ORDER BY modelo;`);
        return res.status(201).json(modelo);
        
    } catch (error) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Consulta de la placa, modelo descripción de la línea y descripción del modelo (línea este activa)
router.get('/consulta/pla-mod-desl-desm', async (req, res) =>{
    
    try {
        const [row] = await connection.query(`
            SELECT placa, modelo, L.descripcion AS 'desLinea', M.descripcion AS 'desMarca' FROM vehiculos V
                JOIN lineas L ON V.id_linea = L.id
                JOIN marcas M ON L.id = M.id
                WHERE L.linea_activa = 'si' ORDER BY placa;
        `);
        return res.status(201).json(row);
        
    } catch (error) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Suma de los modelos
router.get('/consulta/suma-modelo', async (req, res) =>{
    
    try {
        const [row] = await connection.query(`SELECT SUM(modelo) AS 'sumModelo' FROM vehiculos;`);
        return res.status(201).json(row);
        
    } catch (error) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Promedio de los modelos
router.get('/consulta/prom-modelo', async (req, res) =>{
    
    try {
        const [row] = await connection.query(`SELECT AVG(modelo) AS 'promModelo' FROM vehiculos;`);
        return res.status(201).json(row);
        
    } catch (error) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Lineas activas e inactivas
router.get('/consulta/linea-activa-inactiva', async (req, res) =>{
    
    try {
        const [row] = await connection.query(`
            SELECT CASE WHEN linea_activa = "si" THEN COUNT(linea_activa) ELSE 0 END AS Activos, 
                    CASE WHEN linea_activa = "no" THEN COUNT(linea_activa) ELSE 0 END AS Inactivos 
                    FROM lineas;
        `);
        return res.status(201).json(row);
        
    } catch (error) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});



module.exports = router;