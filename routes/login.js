const express = require("express");
const router = express.Router();

const loginController = require("../controllers/login");

router.get("/login", loginController.view);

router.post("/login", loginController.login);

module.exports = router;
