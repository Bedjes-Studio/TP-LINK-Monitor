const express = require("express");
const router = express.Router();

const loggedFilter = require("../middleware/loggedFilter");
const notLoggedFilter = require("../middleware/notLoggedFilter");

const frontCtrl = require("../controllers/front");

router.get("/login", notLoggedFilter, (req, res, next) => {
    res.render("page/login", {
        isLogged: req.auth.isLogged,
    });
});

router.get("/logout", (req, res, next) => {
    res.clearCookie("AUTH_COOKIE");
    res.redirect("/login");
});

router.get("/monitor", loggedFilter, frontCtrl.monitor);

router.use("*", loggedFilter, notLoggedFilter);

module.exports = router;
