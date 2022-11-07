const db = require("../util/database");

exports.getOrder = (req, res) => {
  res.render("order");
};

exports.getOrderHistory = (req, res) => {
  const user_num = req.session.user_num;

  db.query(
    "SELECT * FROM `order` WHERE user_user_num = ?",
    [user_num],
    function (err, result1) {
      if (err) throw err;
      const order_id = result1[0].order_id;
      db.query(
        "SELECT * FROM order_list JOIN book ON order_list.book_book_id = book.book_id WHERE order_list.order_order_id = ?",
        [order_id],
        function (err, result2) {
          if (err) throw err;
          res.render("order_history", { result1, result2 });
        }
      );
    }
  );
};
