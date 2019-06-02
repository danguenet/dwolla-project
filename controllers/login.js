const passport = require("passport");

module.exports = {
  login(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true
    })(req, res, next);
  },
  view(req, res) {
    res.render("login");
  }
};
