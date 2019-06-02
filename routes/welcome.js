const express = require("express");
const router = express.Router();

const welcomeController = require("../controllers/welcome");

router.get("/", welcomeController.view);

module.exports = router;
