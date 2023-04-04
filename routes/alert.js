const express = require("express");
const router = express.Router();

const alertCtrl = require("../controllers/alert");

router.post("/create", alertCtrl.create);
router.get("/read", alertCtrl.read);
router.post("/delete", alertCtrl.delete);

module.exports = router;