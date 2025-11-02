const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serves all files in "minor" folder

// Mock student data
const students = [
  { id: 1, username: "nishita", password: "12345", name: "Nishita Kanojiya" },
  { id: 2, username: "keshav", password: "abcd", name: "Keshav Chikhalikar" },
  { id: 3, username: "udit", password: "9999", name: "Udit Rathod" },
  { id: 4, username: "chanchal", password: "1111", name: "Chanchal Rathore" },
];

// Mock notes data
const notes = {
  "Nishita Kanojiya": ["Artificial Intelligence", "Machine Learning", "DBMS"],
  "Keshav Chikhalikar": ["Operating Systems", "Data Structures", "Networks"],
  "Udit Rathod": ["Python Programming", "Data Science", "Deep Learning"],
  "Chanchal Rathore": ["Web Development", "Cyber Security", "Software Engineering"],
};

// Login API
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = students.find(
    (s) => s.username === username && s.password === password
  );
  if (user) {
    res.json({ success: true, name: user.name });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});

// Notes API
app.get("/notes/:name", (req, res) => {
  const name = req.params.name;
  res.json({ subjects: notes[name] || [] });
});

app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
