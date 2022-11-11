const db = require("../util/database");

exports.getCart = (req, res) => {
  if (!req.session.isLoggedIn) {
    res.render("logIn", {
      isLoggedIn: false,
      Message: "장바구니를 이용하려면 로그인이 필요합니다.",
    });
  } else {
    const usernum = req.session.user_num;
    db.query(
      "SELECT * FROM cart WHERE cart_user_num =?",
      [usernum],
      (err, result) => {
        if (err) throw err;

        if (result.length == 0 && usernum) {
          console.log("장바구니 생성");
          db.query(
            "insert into cart(cart_date, cart_user_num, cart_book_id) values(?,?,?)",
            [new Date(), usernum, booknum]
          );
          res.redirect("/books");
        } else {
          db.query(
            "select * from cart where cart_user_num =?",
            [usernum],
            (err, result) => {
              if (err) throw err;
              date = result[0].cart_date;
              db.query(
                "select cart.cart_num, book.book_id, book.book_name, cart.amount, book.book_price from cart inner join book on cart.cart_book_id = book.book_id where cart_user_num=?",
                [result[0].cart_user_num],
                (err, result) => {
                  if (err) throw err;
                  console.log(result);
                  if (result.length > 0) {
                    res.render("cart", {
                      cart_date: date,
                      cartList: result,
                    });
                  } else {
                    res.render("cart", {
                      cart_date: date,
                    });
                  }
                }
              );
            }
          );
        }
      }
    );
  }
};
