const { Router } = require("express");
const router = Router();
const connection = require('../dataBase/dataBase');


//POST
router.post('/marcas', async (req, res) => {
    try {
        const { nombre } = req.body;
        await connection.query(`
            INSERT INTO marcas (${Object.keys(req.body).join()})
            VALUES (?,?,?);
        `, Object.values(req.body));

        const [rows] = await connection.query(`SELECT * FROM marcas WHERE nombre='${nombre}';`);
        return res.status(200).json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

//GET
router.get('/marcas', async (req, res) =>{
    
    try {
        const [marca] = await connection.query(`SELECT * FROM marcas;`);
        return res.status(208).json(marca);
        
    } catch (error) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
})

module.exports = router;