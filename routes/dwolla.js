const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

const userController = require("../controllers").dwollaCustomers;

router.get("/create-customer", ensureAuthenticated, (req, res) =>
  res.render("create-customer")
);

// Customer
router.post("/customer", ensureAuthenticated, userController.add);

module.exports = router;
