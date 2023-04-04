const { errorHandler } = require("./utils");
const Alert = require("../models/alert");

exports.create = (req, res, next) => {
    createAlert(req.body.type, req.body.description)
        .then(() => {
            res.status(200).json({ result: "Alert created" });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};

exports.read = (req, res, next) => {
    Alert.find({})
        .then((alerts) => {
            res.status(200).json({ alerts: alerts });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};

exports.delete = (req, res, next) => {
    Alert.deleteOne({ _id: req.body.id })
        .then((result) => {
            if (result.deletedCount == 0) {
                res.status(400).json({ result: "Alert with id " + req.body.id + " not found" });
            }
            res.status(200).json({ result: result.deletedCount + " alert with id " + req.body.id + " deleted" });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};

const createAlert = (type, description) => {
    return new Promise(function (resolve, reject) {
        const alert = new Alert({
            type: type,
            description: description,
            date: Date.now(),
        });

        alert.save().then(resolve).catch(reject);
    });
};
