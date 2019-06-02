const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

const dashboardController = require("../controllers/dashboard");

router.get("/", ensureAuthenticated, dashboardController.view);

module.exports = router;
