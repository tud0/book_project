const { request } = require("express");
const db = require("../util/database");

exports.postLogin = (req, res, next) => {
  const { ID, pwd } = req.body;

  if (ID && pwd) {
    //id, pw 입력되었는지 확인
    db.query(
      "SELECT * FROM user WHERE user_id = ? AND user_pw = ?",
      [ID, pwd],
      function (err, result) {
        if (err) throw err;
        if (result[0] !== undefined) {
          //result: [{속성:속성값...}]
          //반환값이 있으면 로그인 성공

          req.session.isLoggedIn = true; // 세션 정보 갱신
          req.session.user = ID;
          req.session.user_num = result[0].user_num;

          if (ID == "admin") {
            req.session.grade_num = 500;
            res.render("admin");
          } else {
            req.session.grade_num = 300;
            const user = req.session.user;
            res.render("main", {
              data: user + "님 환영합니다",
              isLoggedIn: true,
            });
          }
          req.session.save(function () {});
        } else {
          //반환값 없으면 로그인 실패
          res.send(`<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); 
          document.location.href="/logIn";</script>`);
        }
      }
    );
  } else {
    res.send(`<script type="text/javascript">alert("아이디와 비밀번호를 입력하세요"); 
    document.location.href="/logIn";</script>`);
  }
};

exports.postSignUp = (req, res) => {
  // var id = req.body.id;
  // var username = req.body.username;
  // var password = req.body.pwd;

  const { id, username, pwd, tel } = req.body;

  if (id && pwd) {
    db.query(
      "SELECT * FROM user WHERE user_id = ?",
      [id],
      function (err, result) {
        //같은 아이디 있는지 확인
        if (err) throw err;
        if (result.length <= 0) {
          //아이디가 유일한 경우
          db.query(
            "INSERT INTO user (user_id, user_pw, user_name, user_contact) VALUES(?,?,?,?)",
            [id, pwd, username, tel],
            function (err) {
              if (err) throw err;
              res.send(`<script type="text/javascript">alert("회원가입이 완료되었습니다!");
              document.location.href="/";</script>`);
            }
          );
        } else {
          // 아이디가 같은 경우
          res.send(`<script type="text/javascript">alert("같은 아이디가 이미 존재합니다.");
              document.location.href="/";</script>`);
        }
      }
    );
  } else {
    res.send(`<script type="text/javascript">alert("입력되지 않은 정보가 있습니다.");
              document.location.href="/";</script>`);
  }
};
