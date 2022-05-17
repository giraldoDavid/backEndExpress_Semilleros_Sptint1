const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const app = express();
const cors = require('cors');

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.get('', (req,res)=>{
    res.send('<h1>Bienvenido a la API de SEMILLERO SAS</h1>')
})
app.use('/api/', require('./routes/marcas'))
app.use('/api/', require('./routes/lineas'))
app.use('/api/', require('./routes/vehiculos'))
app.use('/api/', require('./routes/consultas'))

app.set("port", process.env.PORT);
app.listen(app.get("port"), () => {
    console.log(`Servidor corriendo en el puerto ${app.get("port")}`);
});