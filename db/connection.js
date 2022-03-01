const mysql = require("mysql2");

const db = mysql.createConnection(
    {
    host: 'localhost',
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: '$03uOFo#3zVi0^Et72',
    database: 'employees'
},
console.log('You are connected to the employees database!')
);

module.exports = db;