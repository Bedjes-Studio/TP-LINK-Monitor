module.exports = (req, res, next) => {
    if (req.auth.isLogged == false) {
        next();
    } else {
        res.redirect("/monitor");
    }
};
