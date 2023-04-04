const express = require("express");
const router = express.Router();

const consumptionCtrl = require("../controllers/consumption");

router.get("/read", consumptionCtrl.read);

module.exports = router;