const express = require("express");
const router = express.Router();

const portCtrl = require("../controllers/port");

router.post("/create", portCtrl.create);
router.get("/read", portCtrl.read);
router.post("/delete", portCtrl.delete);

module.exports = router;
