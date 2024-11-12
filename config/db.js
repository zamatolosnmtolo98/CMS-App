// config/db.js
const mysql = require("mysql2");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "127.0.0.1", // Localhost address
  user: "root", // MySQL username
  password: "Lungeleni55*", // MySQL password
  database: "client_management", // Database name
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = connection;
