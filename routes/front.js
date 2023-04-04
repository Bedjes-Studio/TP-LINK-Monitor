const express = require("express");
const router = express.Router();

const loginFilter = require("../middleware/loginFilter");

const frontCtrl = require("../controllers/front");

router.get("/login", (req, res, next) => {
    res.render("page/login", {
        isLogged: req.auth.isLogged,
    });
});

router.get("/logout", (req, res, next) => {
    res.clearCookie("AUTH_COOKIE");
    res.redirect("/login");
});

router.get("/monitor", loginFilter, frontCtrl.monitor);

router.use("*", (req, res, next) => {
    if (req.auth.isLogged) {
        res.redirect("/monitor");
    } else {
        res.redirect("/login");
    }
});

module.exports = router;
