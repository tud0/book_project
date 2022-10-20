const Product = require("../models/product");
const { rawListeners } = require("../util/database");

// exports.getMain = (req, res, next) => {
//   Product.fetchAll()
//     .then(([rows, fieldData]) => {
//       res.render("/main", {
//         prods: rows,
//         pageTitle: "MainPage",
//         path: "/",
//       });
//     })
//     .catch((err) => console.log(err));
// };

exports.getMain = (req, res) => {
  if (!req.session.isLoggedIn) {
    //로그인 상태가 아닐 때
    res.render("main", {
      isLoggedIn: false,
      userMessage: "로그인을 하세요.",
    });
  } else {
    //로그인 상태일 때
    const username = req.session.name; //이름
    const grade = req.session.grade_num; //300, 500
    let gradeMessage = "";

    switch (grade) {
      case 300:
        gradeMessage = "user"; //일반회원
        break;
      case 500:
        gradeMessage = "admin"; //관리자
      default:
        break;
    }

    res.render("main", {
      isLoggedIn: true,
      userMessage: `${username}님 환영합니다.`,
      grade: gradeMessage,
    });
  }
};
