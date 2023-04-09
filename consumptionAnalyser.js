const mongodb = require("./mongodb");
const { wait, readCsvFromLine } = require("./controllers/utils");
const { amortizeData, detectAttacksPattern } = require("./controllers/consumption");

function consumptionAnalyserDemon(line, oldAmortizeData) {
    readCsvFromLine("./data/consumption.csv", line).then(function (data) {
        if (data.length > 0) {
            console.log("Readed from " + line + " to " + (line + data.length - 1));
            console.log(data);
            line += data.length;
            newAmortizeData = amortizeData(oldAmortizeData, data);
            let alertCount = detectAttacksPattern(newAmortizeData);
            console.log(alertCount + " attack found");
        }
        wait(5000).then(() => {
            consumptionAnalyserDemon(line, newAmortizeData);
        });
    });
}

function startConsumptionAnalyserDemon() {
    let startLine = 1;
    consumptionAnalyserDemon(startLine, [0.125]);
}

mongodb.connect();
startConsumptionAnalyserDemon();
