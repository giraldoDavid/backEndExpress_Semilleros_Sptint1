const { Router } = require("express");
const router = Router();
const connection = require('../dataBase/dataBase');

//POST
router.post('/lineas', async (req, res) => {
    try {
        const { nombre } = req.body;
        await connection.query(`
            INSERT INTO lineas (${Object.keys(req.body).join()})
            VALUES (?,?,?,?);
        `, Object.values(req.body));

        const [rows] = await connection.query(`SELECT * FROM lineas WHERE nombre='${nombre}';`);
        return res.status(200).json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

//GET
router.get('/lineas', async (req, res) =>{
    
    try {
        const [linea] = await connection.query(`SELECT * FROM lineas;`);
        return res.status(208).json(linea);
        
    } catch (error) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
})

module.exports = router;