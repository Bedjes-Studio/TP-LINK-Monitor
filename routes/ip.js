const express = require("express");
const router = express.Router();

const ipCtrl = require("../controllers/ip");

router.get("/read", ipCtrl.read);
router.post("/whitelist", ipCtrl.whitelist);
router.post("/unWhitelist", ipCtrl.unWhitelist);

module.exports = router;