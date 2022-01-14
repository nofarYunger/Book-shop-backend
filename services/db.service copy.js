var mysql = require('mysql2');
const loggerService = require('./logger.service');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Banana17',
    database: 'book_store',
    insecureAuth: true
});

connection.connect(err => {
    if (err) throw new Error('mySql failed connection');
    console.log('connected to SQL server');
})


function runSQL(sqlCommand) {
    return new Promise((resolve, reject) => {
        console.log(sqlCommand);
        connection.query(sqlCommand, function (error, results, fields) {
            if (error) reject(error);
            else resolve(results);
        });
    })
}

module.exports = {
    runSQL
}