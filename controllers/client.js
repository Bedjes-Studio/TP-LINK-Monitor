const { errorHandler } = require("./utils");
const Client = require("../models/client");

exports.create = (req, res, next) => {
    createClient(req.body.ip, req.body.whitelisted)
        .then(() => {
            res.status(200).json({ result: "Client created" });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};

exports.read = (req, res, next) => {
    Client.find({})
        .sort({ ip: 1 })
        .then((clients) => {
            res.status(200).json({ clients: clients });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};

exports.delete = (req, res, next) => {
    Client.deleteOne({ ip: req.body.ip })
        .then((result) => {
            if (result.deletedCount == 0) {
                res.status(400).json({ result: "Client with ip " + req.body.ip + " not found" });
            } else {
                res.status(200).json({ result: result.deletedCount + " client with ip " + req.body.ip + " deleted" });
            }
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};

exports.whitelist = (req, res, next) => {
    Client.updateOne({ ip: req.body.ip }, { whitelisted: true })
        .then((result) => {
            res.status(200).json({ result: "Client whitelisted" });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};

exports.unWhitelist = (req, res, next) => {
    Client.updateOne({ ip: req.body.ip }, { whitelisted: false })
        .then((result) => {
            res.status(200).json({ result: "Client unwhitelisted" });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};

const createClient = (ip, whitelisted) => {
    return new Promise(function (resolve, reject) {
        const client = new Client({
            ip: ip,
            whitelisted: whitelisted,
        });

        client.save().then(resolve).catch(reject);
    });
};

exports.createClient = createClient;
