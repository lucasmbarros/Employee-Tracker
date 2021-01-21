// import
const mysql = require("mysql2");

require("dotenv").config();

// Connect to database
const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PW,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to employee database");
});

module.exports = connection;
