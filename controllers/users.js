const passport = require("passport");
const bcrypt = require("bcryptjs");

const User = require("../models/users");

module.exports = {
  login(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/users/login",
      failureFlash: true
    })(req, res, next);
  },

  logout(req, res) {
    req.logout();
    req.flash("success_msg", "You are logged out");
    res.redirect("/users/login");
  },

  register(req, res) {
    const { email, password, password2 } = req.body;
    let errors = [];

    if (!email || !password || !password2) {
      errors.push({ msg: "Please enter all fields" });
    }

    if (password != password2) {
      errors.push({ msg: "Passwords do not match" });
    }

    if (password.length < 6) {
      errors.push({ msg: "Password must be at least 6 characters" });
    }

    if (errors.length > 0) {
      res.render("register", {
        errors,
        email,
        password,
        password2
      });
    } else {
      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: "Email already exists" });
          res.render("register", {
            errors,
            email,
            password,
            password2
          });
        } else {
          const newUser = new User({
            email,
            password
          });

          bcrypt.genSalt(10, (_err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(() => {
                  req.flash(
                    "success_msg",
                    "You are now registered and can log in"
                  );
                  res.redirect("/users/login");
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  }
};
