const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");

// Routes
const routes = require("./routes");

const keys = require("./config/keys");

const app = express();

// Passport config
require("./config/passport")(passport);

// Database config
const db = keys.MongoURI;

// Conect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Express body parser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
  session({
    secret: keys.SessionSecret,
    resave: false,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global variables - passing message through session
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", routes);

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
