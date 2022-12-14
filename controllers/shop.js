const db = require("../util/database");
const adminRoutes = require("../routes/admin");
const express = require("express");
const app = express();
const adminController = require("../controllers/admin");

exports.getMain = (req, res) => {
  res.render("main", { data: "로그인을 해주세요.", isLoggedIn: false });
};

exports.getBooks = (req, res) => {
  db.query("SELECT * FROM book", [], function (err, result) {
    if (err) throw err;
    res.render("books", { result });
  });
};

exports.getBookDetail = (req, res) => {
  const bookId = req.params.data;

  db.query(
    "SELECT * FROM book WHERE book_id =?",
    [bookId],
    function (err, result) {
      if (err) throw err;
      res.render("book_detail", { result });
    }
  );
};
