const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

const customerController = require("../controllers/customers");

router.get("/create", ensureAuthenticated, customerController.view);

router.post("/", ensureAuthenticated, customerController.add);

module.exports = router;
