const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config");

const User = require("../models/user");

// TODO : Hide this request later
exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                username: req.body.username,
                password: hash,
            });

            user.save()
                .then(() => {
                    res.status(201).json({
                        message: "User saved successfully!",
                        user: user,
                    });
                })
                .catch((error) => {
                    res.status(400).json({
                        error: error,
                    });
                });
        })
        .catch((error) => res.status(500).json({ error: "internal server error" }));
};

exports.login = (req, res, next) => {
    if (req.body.username && req.body.password) {
        User.findOne({ username: req.body.username })
            .then((user) => {
                if (!user) {
                    return res.status(401).json({ error: "Utilisateur non trouvé !" });
                }
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((valid) => {
                        if (!valid) {
                            return res.status(401).json({ error: "Mot de passe incorrect !" });
                        }
                        token = jwt.sign({ username: req.body.username }, config.server.key, { expiresIn: "24h" });
                        res.cookie("AUTH_COOKIE", token);
                        console.log;
                        res.status(200).json({ token: token });
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).json({ error });
                    });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ error });
            });
    } else {
        res.status(401).json({ message: "Please enter Username and Password!" });
    }
};
