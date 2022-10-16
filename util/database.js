const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "book_schema",
  password: "0126",
  port: "8080",
});

module.exports = pool.promise();
