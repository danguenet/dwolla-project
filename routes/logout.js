const express = require("express");
const router = express.Router();

const logoutController = require("../controllers/logout");

router.get("/logout", logoutController.logout);

module.exports = router;
