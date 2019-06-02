const express = require("express");
const router = express.Router();

const registerController = require("../controllers/register");

router.get("/", registerController.view);

router.post("/", registerController.register);

module.exports = router;
