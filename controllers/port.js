const { errorHandler } = require("./utils");
const Port = require("../models/port");

exports.create = (req, res, next) => {
    const port = new Alert({
        number: req.body.number,
        open: true,
    });

    port.save()
        .then(() => {
            res.status(200).json({ result: "Port created" });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};

exports.read = (req, res, next) => {
    Port.find({})
        .then((ports) => {
            res.status(200).json({ ports: ports });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};

exports.delete = (req, res, next) => {
    Port.deleteOne({ _id: req.body.id })
        .then((result) => {
            if (result.deletedCount == 0) {
                res.status(400).json({ result: "Port with id " + req.body.id + " not found" });
            }
            res.status(200).json({ result: result.deletedCount + " port with id " + req.body.id + " deleted" });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};
