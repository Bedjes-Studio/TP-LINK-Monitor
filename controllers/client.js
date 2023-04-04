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
        .then((clients) => {
            res.status(200).json({ clients: clients });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};

exports.delete = (req, res, next) => {
    Client.deleteOne({ _id: req.body.id })
        .then((result) => {
            if (result.deletedCount == 0) {
                res.status(400).json({ result: "Client with id " + req.body.id + " not found" });
            }
            res.status(200).json({ result: result.deletedCount + " client with id " + req.body.id + " deleted" });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};

exports.whitelist = (req, res, next) => {
    Client.updateOne({ _id: req.body.id }, { whitelisted: true })
        .then((result) => {
            console.log(result);
            res.status(200).json({ result: "Client whitelisted" });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};

exports.unWhitelist = (req, res, next) => {
    Client.updateOne({ _id: req.body.id }, { whitelisted: false })
        .then((result) => {
            console.log(result);
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
