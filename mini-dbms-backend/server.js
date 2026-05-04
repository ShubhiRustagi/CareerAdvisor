const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

console.log("SERVER FILE RUNNING");

// ROOT ROUTE
app.get('/', (req, res) => {
    res.send("Backend working 🚀");
});

// STUDENT ROUTE - GET ALL STUDENTS
app.get('/student', (req, res) => {
    db.query("SELECT * FROM STUDENT", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Database error");
        } else {
            res.json(result);
        }
    });
});

// ADD STUDENT - UPDATED WITH academic, interests, skills
app.post('/addStudent', (req, res) => {
    console.log("POST HIT", req.body);

    const { student_id, name, age, email, degree, password, mobile_number, academic, interests, skills } = req.body;

    const sql = `
        INSERT INTO STUDENT (student_id, name, age, email, degree, password, mobile_number, academic, interests, skills)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [student_id, name, age, email, degree, password, mobile_number, academic, interests, skills], (err, result) => {
        if (err) {
            console.log("DB Error:", err);
            res.status(500).send("Error adding student: " + err.message);
        } else {
            res.json({ success: true, student_id: student_id, message: "Student added successfully" });
        }
    });
});

// ✅ COURSE ROUTE - GET ALL COURSES
app.get('/course', (req, res) => {
    db.query("SELECT * FROM COURSE", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Database error");
        } else {
            res.json(result);
        }
    });
});

// ✅ TEST ROUTE
app.get('/test', (req, res) => {
    res.send("Test works");
});

// ✅ START SERVER
app.listen(5000, () => {
    console.log("Server running on port 5000");
});