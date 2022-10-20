const { request } = require("express");
const db = require("../util/database");

exports.postLogin = (req, res, next) => {
  var id = req.body.id;
  var password = req.body.qwd;
  if (id && password) {
    //id, pw 입력되었는지 확인
    db.query(
      "SELECT * FROM user WHERE user_id = ? AND user_pw = ?",
      [id, password],
      function (err, result, fields) {
        if (err) throw err;
        if (result.length > 0) {
          //반환값이 있으면 로그인 성공
          req.session.isLoggedIn = true; // 세션 정보 갱신
          req.session.id = id;
          req.session.save(function () {
            res.redirect("/");
          });
        } else {
          //반환값 없으면 로그인 실패
          res.send(`<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); 
          document.location.href="/login";</script>`);
        }
      }
    );
  } else {
    res.send(`<script type="text/javascript">alert("아이디와 비밀번호를 입력하세요"); 
    document.location.href="/login";</script>`);
  }
};

exports.postSignUp = (req, res) => {
  var id = req.body.id;
  var username = req.body.username;
  var password = req.body.pwd;
  var check = req.body.pwd2;

  if (id && password && check) {
    db.query(
      "SELECT * FROM user WHERE user_id = ?",
      [id],
      function (err, result, fields) {
        //같은 아이디 있는지 확인
        if (err) throw err;
        if (result.length <= 0 && password == check) {
          //아이디가 유일하고, 비밀번호 올바른 경우
          db.query(
            "INSERT INTO user (user_id, user_pw, user_name) VALUES(?,?,?)",
            [id, password, username],
            function (err, data) {
              if (err) throw err;
              res.send(`<script type="text/javascript">alert("회원가입이 완료되었습니다!");
              document.location.href="/";</script>`);
            }
          );
        } else if (password != check) {
          // 비밀번호가 틀린 경우
          res.render("signUp", {
            text: "비밀번호가 올바르지 않습니다.",
          });
        } else {
          // 아이디가 같은 경우
          res.render("signUp", {
            text: "같은 아이디가 이미 존재합니다.",
          });
        }
      }
    );
  } else {
    res.render("signUp", {
      // 입력되지 않은 정보가 있는 경우
      text: "입력되지 않은 정보가 있습니다.",
    });
  }
};

// exports.postSignUp = (req, res) => {
//   console.log("회원가입 하는중");
//   const body = req.body;
//   const id = body.id;
//   const pw = body.pwd;
//   const name = body.username;

//   db.query("select * from user where user_id=?", [id], (err, data) => {
//     if (data.length == 0) {
//       console.log("회원가입 성공");
//       db.query("insert into user(user_id, user_pw, user_name) value(?,?,?)", [
//         id,
//         pw,
//         name,
//       ]);
//       res.render("signUp");
//     } else {
//       console.log("회원가입 실패");
//       res.send('<script>alert("회원가입 실패");</script>');
//       res.render("signUp");
//     }
//   });
// };
