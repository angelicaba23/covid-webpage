var mysql = require('mysql');
const { database } = require('../controller/keys');
const { promisify } = require('util')

// Data base
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        console.error('error conecting: ' + err.stack);
        return;
    }
    if (connection) connection.release();
    console.log('conected as id ' + connection.threadId);
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;