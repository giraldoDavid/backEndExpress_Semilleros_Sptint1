const { Router } = require("express");
const router = Router();
const connection = require('../dataBase/dataBase');


//POST
router.post('/vehiculos', async (req, res) => {
    try {
        const { placa } = req.body;
        await connection.query(`
            INSERT INTO vehiculos (${Object.keys(req.body).join()})
            VALUES (?,?,?,?,?,?);
        `, Object.values(req.body));

        const [rows] = await connection.query(`SELECT * FROM vehiculos WHERE placa='${ placa }';`);
        return res.status(200).json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error..." });
    }
})


//PATCH
router.patch('/vehiculos/:placa',async (req, res) => {
    try {
        const {placa} = req.params;

        const fields = Object.keys(req.body);
        const fieldsQuery = fields.map(field => {
            if(typeof req.body[`${field}`] === 'string'){
                return `${field} = '${req.body[`${field}`]}'`
            }else{
                return `${field} = ${req.body[`${field}`]}`
            }
        })

        const result = await connection.query(`UPDATE vehiculos SET ${fieldsQuery.join()} WHERE placa = '${placa}'`);
        const [rows] = await connection.query(`SELECT * FROM vehiculos WHERE placa = '${placa}';`);
        return res.status(200).json(rows);
    }catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
})


//DELETE
router.delete('/vehiculos/:placa', async (req, res) => {
    try {
        const {placa} = req.params;
        await connection.query(`DELETE FROM vehiculos WHERE placa = '${placa}';`);
        return res.status(200).json('Vehiculo eliminado correctamente');
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
})

//GET

router.get('/vehiculos', async (req, res) =>{
    
    try {
        const [vehiculo] = await connection.query(`SELECT * FROM vehiculos;`);
        return res.status(208).json(vehiculo);
        
    } catch (error) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
})

module.exports = router;

