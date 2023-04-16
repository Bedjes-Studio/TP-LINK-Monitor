const express = require("express");
const router = express.Router();

const loggedFilter = require("../middleware/loggedFilter");

const userRoutes = require("./user");
const alertRoutes = require("./alert");
const portRoutes = require("./port");
const clientRoutes = require("./client");
const consumptionRoutes = require("./consumption");

const apiCtrl = require("../controllers/api");

router.use("/user", userRoutes);
router.use("/alert", loggedFilter, alertRoutes);
router.use("/port", loggedFilter, portRoutes);
router.use("/client", loggedFilter, clientRoutes);
router.use("/consumption", loggedFilter, consumptionRoutes);
router.get("/networkData", loggedFilter, apiCtrl.networkData);

module.exports = router;
