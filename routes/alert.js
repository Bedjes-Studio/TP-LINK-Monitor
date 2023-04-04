const express = require("express");
const router = express.Router();

const alertCtrl = require("../controllers/alert");

router.get("/read", alertCtrl.read);

module.exports = router;