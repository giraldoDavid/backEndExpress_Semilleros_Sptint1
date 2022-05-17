const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    database: process.env.DATABASE_NAME,
    port: process.env.PORT_DB,
    password: process.env.PASSWORD_DB
})

module.exports = connection;