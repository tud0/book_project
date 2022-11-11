exports.getLogin = (req, res, next) => {
  res.render("logIn", { Message: "로그인을 하세요." });
};

exports.getSignUp = (req, res, next) => {
  res.render("signUp");
};

exports.getLogout = (req, res, next) => {
  req.session.destroy();
  res.send(`<script type="text/javascript">alert("로그아웃 되었습니다."); 
  document.location.href="/";</script>`);
};
