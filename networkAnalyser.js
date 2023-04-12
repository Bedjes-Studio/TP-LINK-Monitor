const mongodb = require("./mongodb");
const { wait, readCsvFromLine } = require("./controllers/utils");

function parseData(line) {
    return "0.0.0.0";
}

function networkAnalyserDemon(line) {
    readCsvFromLine("./data/network_whitelist.csv", line).then(function (data) {
        if (data.length > 0) {
            console.log("Readed from " + line + " to " + (line + data.length - 1));
            console.log(data);
            line += data.length;
            parsedData = parseData(data);
            // createAlert("Blacklisted Host", parseData);
        }
        wait(5000).then(() => {
            consumptionAnalyserDemon(line, newAmortizeData);
        });
    });
}

function startNetworkAnalyserDemon() {
    let startLine = 1;
    networkAnalyserDemon(startLine);
}

// mongodb.connect();
// startNetworkAnalyserDemon();

const { fork } = require("child_process");

const child = fork(__dirname + "/tshark");

child.on("message", (message) => {
    console.log(message);
});

child.send("START");
