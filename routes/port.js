const express = require("express");
const router = express.Router();

const portCtrl = require("../controllers/port");

router.post("/create", portCtrl.create);
router.get("/read", portCtrl.read);
router.post("/delete", portCtrl.delete);
router.post("/open", portCtrl.openPort);
router.post("/close", portCtrl.closePort);

module.exports = router;
