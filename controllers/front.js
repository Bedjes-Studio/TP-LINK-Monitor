exports.monitor = (req, res, next) => {
    res.render("page/monitor", {
        isLogged: req.auth.isLogged,
        username: req.auth.username,
    });
};
