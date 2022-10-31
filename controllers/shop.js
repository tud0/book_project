const db = require("../util/database");
const adminRoutes = require("../routes/admin");
const express = require("express");
const app = express();
const adminController = require("../controllers/admin");
const title = require("../views/books.pug");

exports.getMain = (req, res) => {
  res.render("main");
};

exports.getBooks = (req, res) => {
  db.query("SELECT * FROM book", [], function (err, result) {
    if (err) throw err;
    res.render("books", { result });
  });
};

exports.getBookDetail = (req, res) => {
  db.query(
    "SELECT * FROM book WHERE book_name = ?",
    [book_name],
    function (err, result) {
      if (err) throw err;
      res.render("book_detail", { result });
    }
  );
};
