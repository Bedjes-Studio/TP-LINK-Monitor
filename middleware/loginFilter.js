module.exports = (req, res, next) => {
    if (req.auth.isLogged == false) {
        res.redirect("/login");
    } else {
        next();
    }
};
