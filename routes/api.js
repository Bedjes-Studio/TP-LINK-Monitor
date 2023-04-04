const express = require("express");
const router = express.Router();

const loggedFilter = require("../middleware/loggedFilter");

const userRoutes = require("./user");
const alertRoutes = require("./alert");
const ipRoutes = require("./ip");

const apiCtrl = require("../controllers/api");

router.use("/user", userRoutes);
router.use("/alert", loggedFilter, alertRoutes);
router.use("/ip", loggedFilter, ipRoutes);
router.get("/powerData", loggedFilter, apiCtrl.powerData);
router.get("/networkData", loggedFilter, apiCtrl.networkData);

module.exports = router;
