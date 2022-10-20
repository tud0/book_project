exports.getLogin = (req, res, next) => {
  res.render("logIn", {
    path: "/logIn",
    pageTitle: "Login",
    isAuthenticated: req.isLoggedIn,
  });
};

exports.getSignUp = (req, res, next) => {
  res.render("signUp");
};
