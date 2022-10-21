const db = require("../util/database");

exports.postProducts = (req, res, next) => {
  const { title, price, quantity } = req.body;

  if (title && price && quantity) {
    db.query(
      "SELECT * FROM book WHERE book_name = ? AND book_price = ?",
      [title, price],
      function (err, result) {
        if (err) throw err;
        if (result.length <= 0) {
          //같은 책이 없는 경우
          db.query(
            "INSERT INTO book (book_name, book_price, book_stock) VALUES(?,?,?)",
            [title, price, quantity],
            function (err) {
              if (err) throw err;
              res.send(`<script type="text/javascript">alert("새로운 책이 추가 되었습니다.");
                            document.location.href="/products";</script>`);
            }
          );
        } else {
          //같은 책이 있는 경우
          const ID = result[0].book_id;
          db.query(
            "UPDATE book SET book_stock = book_stock + ? WHERE book_id = ?",
            [quantity, ID],
            function (err) {
              if (err) throw err;
              res.send(`<script type="text/javascript">alert("재고가 추가 되었습니다.");
                document.location.href="/products";</script>`);
            }
          );
        }
      }
    );
  }
};
