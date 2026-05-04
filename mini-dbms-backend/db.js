const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Rs@201105',
    database: 'CAREERANALYSIS'
});

db.connect((err) => {
    if (err) {
        console.log("DB connection failed:", err);
    } else {
        console.log("Connected to MySQL");
    }
});

module.exports = db;