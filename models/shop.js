const db = require("../util/database");
const { request } = require("express");

exports.postBook = (req, res, next) => {
  const { book } = req.body;

  db.query(
    "SELECT * FROM book WHERE book_name = ?",
    [book],
    function (err, result) {
      if (err) throw err;
      res.render("books", { result });
    }
  );
};
