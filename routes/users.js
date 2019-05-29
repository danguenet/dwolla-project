const express = require("express");
const router = express.Router();

const userController = require("../controllers").users;

router.get("/login", (req, res) => res.render("login"));
router.get("/register", (req, res) => res.render("register"));

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

module.exports = router;
