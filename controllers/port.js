const { errorHandler } = require("./utils");
const Port = require("../models/port");

exports.create = (req, res, next) => {
    const port = new Port({
        number: req.body.number,
        open: req.body.open,
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
    Port.deleteOne({ number: req.body.number })
        .then((result) => {
            if (result.deletedCount == 0) {
                res.status(400).json({ result: "Port with number " + req.body.number  + " not found" });
            }
            res.status(200).json({ result: result.deletedCount + " port with number " + req.body.number + " deleted" });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};

exports.openPort = (req, res, next) => {
    Port.updateOne({ number: req.body.number }, { open: true })
        .then((result) => {
            res.status(200).json({ result: "Port open" });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};

exports.closePort = (req, res, next) => {
    Port.updateOne({ number: req.body.number }, { open: false })
        .then((result) => {
            res.status(200).json({ result: "Port closed" });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};
