module.exports = (req, res, next) => {
    if (req.auth.isLogged == true) {
        next();
    } else {
        res.redirect("/login");
    }
};
