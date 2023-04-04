const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
    if (req.cookies["AUTH_COOKIE"] != undefined) {
        try {
            let token = req.cookies["AUTH_COOKIE"];
            let decodedToken = jwt.verify(token, config.server.key);
            let username = decodedToken.username;

            req.auth = {
                isLogged: true,
                username: username,
            };

            next();
        } catch (error) {
            if (error.name == "TokenExpiredError") {
                res.clearCookie("AUTH_COOKIE");
            }
            res.redirect("/login");
        }
    } else {
        req.auth = {
            isLogged: false,
        };
        next();
    }
};
