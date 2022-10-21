const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0126",
  database: "book_schema",
  port: "8080",
});

db.connect((err) => {
  if (!err) console.log("DB 정상가동 중");
});

module.exports = db;
