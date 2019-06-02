const express = require("express");
const router = express.Router();

const customersRoutes = require("./customers");
const dashboardRoutes = require("./dashboard");
const fundingSourcesRoutes = require("./funding-sources");
const loginRoutes = require("./login");
const logoutRoutes = require("./logout");
const registerRoutes = require("./register");
const transfersRoutes = require("./transfers");
const welcomeRoutes = require("./welcome");

router.use("/customers", customersRoutes);
router.use("/funding-sources", fundingSourcesRoutes);
router.use("/login", loginRoutes);
router.use("/logout", logoutRoutes);
router.use("/register", registerRoutes);
router.use("/transfers", transfersRoutes);
router.use("/welcome", welcomeRoutes);
router.use("/", dashboardRoutes);

module.exports = router;
