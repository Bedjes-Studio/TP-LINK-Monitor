const express = require("express");
const router = express.Router();

const clientCtrl = require("../controllers/client");

router.post("/create", clientCtrl.create);
router.get("/read", clientCtrl.read);
router.post("/delete", clientCtrl.delete);
router.post("/whitelist", clientCtrl.whitelist);
router.post("/unWhitelist", clientCtrl.unWhitelist);

module.exports = router;