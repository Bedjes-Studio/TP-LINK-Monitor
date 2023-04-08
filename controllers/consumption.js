const { errorHandler, readCsvFromLine } = require("./utils");
const { createAlert } = require("./alert");

exports.read = (req, res, next) => {
    readCsvFromLine("./data/consumption.csv", 1)
        .then((data) => {
            res.status(200).json({ result: data });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};

exports.check = (req, res, next) => {
    readCsvFromLine("./data/consumption.csv", 1)
        .then((data) => {
            detectAttacksPattern(data);
            res.status(200).json({ result: data });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};

// TODO : Jean - amortize data
exports.amortizeData = function AmortizeData(oldAmortizeData, newData) {
    return newData;
};

// TODO : Jean - detect patterns
exports.detectAttacksPattern = function detectAttacksPattern(data) {
    let alertCount = 0;
    // if ( detect pattern ) {
    // alertCount += 1;
    // console.log & create alert
    // createAlert("type", "description");
    // }
    return alertCount;
};
