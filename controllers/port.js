const { errorHandler } = require("./utils");
const Port = require("../models/port");

exports.create = (req, res, next) => {
    Port.find({ number: req.body.number }).then((port) => {
        if (port.length == 0) {
            createPort(req.body.number, req.body.open)
                .then(() => {
                    res.status(200).json({ result: "Port created" });
                })
                .catch((error) => {
                    errorHandler(error, res);
                });
        } else {
            Port.updateOne({ number: req.body.number }, { open: req.body.open })
                .then((result) => {
                    res.status(200).json({ result: "Port open status updated" });
                })
                .catch((error) => {
                    errorHandler(error, res);
                });
        }
    });
};

exports.read = (req, res, next) => {
    Port.find({})
        .sort({ number: 1 })
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
                res.status(400).json({ result: "Port with number " + req.body.number + " not found" });
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

const createPort = (number, open) => {
    return new Promise(function (resolve, reject) {
        const port = new Port({
            number: number,
            open: open,
        });

        port.save().then(resolve).catch(reject);
    });
};

exports.createPort = createPort;
