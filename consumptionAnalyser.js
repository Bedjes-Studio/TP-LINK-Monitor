const mongodb = require("./mongodb");
const { wait, readCsvFromLine } = require("./controllers/utils");
const { amortizeData, detectAttacksPattern } = require("./controllers/consumption");
const config = require("./config");

function consumptionAnalyserDemon(line, oldAmortizeData) {
    readCsvFromLine("./data/" + config.file.consumption, line).then((data) => {
        // readCsvFromLine("./data/historic_consumption.csv", line).then((data) => { // test with historic
        data = data.values;
        if (data.length > 0) {
            console.log("Readed from " + line + " to " + (line + data.length - 1));
            line += data.length;
            newAmortizeData = amortizeData(oldAmortizeData, data);
            detectAttacksPattern(newAmortizeData);
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
