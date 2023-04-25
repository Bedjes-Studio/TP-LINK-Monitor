const { errorHandler, readCsvFromLine } = require("./utils");
const { createAlert } = require("./alert");
const config = require("../config");

exports.read = (req, res, next) => {
    readCsvFromLine("./data/" + config.file.consumption, 1)
        .then((data) => {
            res.status(200).json({ result: data });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};

exports.check = (req, res, next) => {
    readCsvFromLine("./data/" + config.file.consumption, 1)
        .then((data) => {
            detectAttacksPattern(data);
            res.status(200).json({ result: data });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};

exports.amortizeData = function AmortizeData(oldAmortizeData, newData) {
    let newAmortizeData = [oldAmortizeData[oldAmortizeData.length - 1]];
    const t0 = 1;
    const tau = 75;
    for (const element of newData) {
        newAmortizeData.push((parseFloat(element) + (tau / t0) * newAmortizeData[newAmortizeData.length - 1]) / (1 + tau / t0));
    }
    return newAmortizeData;
};

exports.detectAttacksPattern = function detectAttacksPattern(data) {
    if ((data[data.length - 1] - data[0]) / data.length > 0.001) {
        createAlert("Consommation énergétique", "Une consommation énergétique anormale a été détecté. Cela peut résulter d'une attaque de type DOS");
        console.log("Surconsommation detectée");
    }
};
