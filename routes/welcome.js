const express = require("express");
const router = express.Router();

const welcomeController = require("../controllers/welcome");

router.get("/welcome", welcomeController.view);

module.exports = router;
