const mysql = require('mysql2');

const pool = mysql.createPool({
   host: 'localhost',
   user: 'root',
   database: 'toys-shop',
   password: 'Asdfg123!@#',
});

module.exports = pool.promise();
