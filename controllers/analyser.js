const config = require("../config");
const { errorHandler } = require("./utils");
const { spawn } = require("child_process");
const Analyser = require("../models/analyser");
const find = require("find-process");
var kill = require("tree-kill");

function createAnalyserProcess(script) {
    const analyserProcess = spawn("node", [script]);

    analyserProcess.stdout.on("data", (data) => {
        console.log("[" + script + "] stdout: " + data);
    });

    analyserProcess.stderr.on("data", (data) => {
        console.log("[" + script + "] stderr: " + data);
    });

    analyserProcess.on("error", (error) => {
        console.log("[" + script + "] error: " + error.message);
    });

    analyserProcess.on("close", (code) => {
        console.log("[" + script + "] child process exited with code: " + code);
    });
    return analyserProcess.pid;
}

exports.start = (req, res, next) => {
    switch (req.body.type) {
        case "Consumption":
            console.log("consumption");

            const analyserProcessPID = createAnalyserProcess("consumptionAnalyser.js");

            Analyser.updateOne({ type: req.body.type }, { pid: analyserProcessPID, running: true })
                .then((result) => {
                    res.status(200).json({ result: req.body.type + " analyser started open" });
                })
                .catch((error) => {
                    errorHandler(error, res);
                });
            break;
    }
};

exports.status = (req, res, next) => {
    Analyser.find({})
        .then((analyser) => {
            res.status(200).json({ analyser: analyser });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};

exports.check = (req, res, next) => {
    Analyser.find({})
        .then((analysers) => {
            let promises = [];
            analysers.forEach((analyser) => {
                promises.push(
                    find("pid", analyser.pid).then((runningProcess) => {
                        if (runningProcess.length == 0) {
                            Analyser.updateOne({ type: analyser.type }, { running: false }).then((result) => {
                                console.log("Process " + analyser.type + " is not running anymore");
                            });
                        }
                    })
                );
            });
            Promise.all(promises).then(() => res.status(200).json({ result: "Status updated" }));
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};

exports.kill = (req, res, next) => {
    Analyser.findOne({ type: req.body.type })
        .then((analyser) => {
            kill(analyser.pid, function (error) {
                if (error) {
                    errorHandler(error, res);
                } else {
                    Analyser.updateOne({ type: req.body.type }, { running: false }).then((result) => {
                        res.status(200).json({ result: "Status updated" });
                    });
                }
            });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
};
