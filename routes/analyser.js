const express = require("express");
const router = express.Router();

const analyserCtrl = require("../controllers/analyser");

router.post("/start", analyserCtrl.start);
router.get("/status", analyserCtrl.status);
router.get("/check", analyserCtrl.check);
router.post("/kill", analyserCtrl.kill);

module.exports = router;
