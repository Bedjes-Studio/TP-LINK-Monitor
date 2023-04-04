const { errorHandler } = require("./utils");
const fs = require("fs");
const { parse } = require("csv-parse");

exports.read = (req, res, next) => {
    readConsumptionData()
        .then((data) => {
            res.status(200).json({ result: data });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};

exports.check = (req, res, next) => {
    readConsumptionData()
        .then((data) => {
            detectAttacksPattern(data);
            res.status(200).json({ result: data });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};

// TODO : detect patterns
function detectAttacksPattern(data) {
    // if ( detect pattern ) 
    // console.log & create alert
}


const readConsumptionData = () => {
    return new Promise((resolve, reject) => {
        const data = [];

        fs.createReadStream("./data/consumption.csv")
            .pipe(
                parse({
                    delimiter: ":",
                })
            )
            .on("data", function (row) {
                data.push(row[0]);
            })
            .on("error", (error) => {
                reject(error);
            })
            .on("end", () => {
                resolve(data);
            });
    });
};