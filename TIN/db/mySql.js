const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'tin_database',
    multipleStatements: true,
    charset: 'utf8'
});

module.exports = pool.promise();