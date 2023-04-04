const fs = require("fs");
const { parse } = require("csv-parse");

const { wait } = require("./utils");

let start = 1;

const readNetworkData = () => {
    return new Promise((resolve, reject) => {
        const data = [];

        fs.createReadStream("../data/network.csv")
            .pipe(
                parse({
                    delimiter: ":",
                    from_line: start,
                })
            )
            .on("data", function (row) {
                data.push(row[0]);
                start += 1;
                console.log(start);
            })
            .on("error", (error) => {
                reject(error);
            })
            .on("end", () => {
                resolve(data);
            });
    });
};

// TODO : Jean
function analyse(oldAmortizeData, newData) {
    return newData;
}

function runAnalyse(oldAmortizeData) {
    readNetworkData().then(function (data) {
        if (data.length > 0) {
            console.log(data);
            console.log("Read until " + start);
            newAmortizeData = analyse(oldAmortizeData, data);
        }
        wait(5000).then(runAnalyse(newAmortizeData));
    });
}

runAnalyse([]);
