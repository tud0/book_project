const db = require("../util/database");
const { request } = require("express");

exports.postBook = (req, res, next) => {
  const { search } = req.body;

  db.query(
    "SELECT * FROM book WHERE book_name = ?",
    [search],
    function (err, result) {
      if (err) throw err;
      res.render("books", { result });
    }
  );
};
