const { spawn } = require("child_process");

const config = require("./config");
const mongodb = require("./mongodb");
const Client = require("./models/client");
const Port = require("./models/port");
const { createClient } = require("./controllers/client");
const { createPort } = require("./controllers/port");
const { wait } = require("./controllers/utils");
const { createAlert } = require("./controllers/alert");

function formatIPData(data) {
    let formattedData = data.split(/\r?\n|\r|\n/g).filter((row) => row != ""); // split lines and remove empty
    return [...new Set(formattedData)]; // remove duplicates
}

function startIpDemon() {
    const captureInterface = "-i 4";
    const fieldPrintOption = '-T fields -E "header=n"';
    const fields = "-e ip.src";
    const lineBuffered = "-l";

    createIPFilters().then((filter) => {
        console.log("# Starting Ip demon");
        console.log("Wireshark filter : " + filter);
        const child = spawn('".\\Wireshark\\tshark"', [captureInterface, filter, fieldPrintOption, fields, lineBuffered], { shell: true });

        child.stdout.on("data", (data) => {
            analyseIps(data.toString());
        });

        child.stderr.on("data", (data) => {
            console.error(`stderr: ${data}`);
        });

        child.on("error", (error) => {
            console.error(`error: ${error.message}`);
        });

        child.on("close", (code) => {
            console.log(`child process exited with code ${code}`);
        });
    });
}

const createIPFilters = () => {
    return new Promise(function (resolve, reject) {
        Client.find({})
            .then((clients) => {
                let filter = "";
                if (clients.length == 0) {
                    resolve(filter);
                }
                for (let i = 0; i <= clients.length; ++i) {
                    if (i == 0) {
                        filter += '-Y "';
                        filter += "ip.src != " + clients[i].ip;
                    } else if (i == clients.length) {
                        filter += '"';
                    } else {
                        filter += " && ip.src != " + clients[i].ip;
                    }
                }
                resolve(filter);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

function analyseIps(data) {
    ips = formatIPData(data);

    console.log("Wireshark found " + ips.length + " ips");
    console.log(ips);

    Client.find({ ip: { $in: ips } })
        .then((whitelistedClients) => {
            let whitelistedIps = whitelistedClients.map((client) => client.ip);

            ips = ips.filter((ip) => {
                return !whitelistedIps.includes(ip);
            });

            if (ips.length > 0) {
                ips.forEach((ip) => {
                    createClient(ip, false)
                        .then(() => {
                            console.log("Client " + ip + " blacklisted");
                            // TODO : kill child process and spawn again ?
                            createAlert("New ip detected", "New ip is " + ip + " and isn't whitelisted.");
                        })
                        .catch((error) => {
                            console.log("Client " + ip + " is ever blacklisted");
                        });
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function formatPortData(data) {
    let formattedData = data.split(/\r?\n|\r|\t|\n/g).filter((row) => row != ""); // split lines and remove empty
    return [...new Set(formattedData)]; // remove duplicates
}

function startPortDemon() {
    // TODO : select wifi interface
    const captureInterface = "-i 4";
    const fieldPrintOption = '-T fields -E "header=n"';
    const fields = "-e tcp.dstport -e udp.dstport";
    const lineBuffered = "-l";

    createPortFilters().then((filter) => {
        console.log("# Starting ports demon");
        console.log("Wireshark filter : " + filter);
        const child = spawn('".\\Wireshark\\tshark"', [captureInterface, filter, fieldPrintOption, fields, lineBuffered], {
            shell: true,
        });

        child.stdout.on("data", (data) => {
            analysePorts(data.toString());
        });

        child.stderr.on("data", (data) => {
            console.error(`stderr: ${data}`);
        });

        child.on("error", (error) => {
            console.error(`error: ${error.message}`);
        });

        child.on("close", (code) => {
            console.log(`child process exited with code ${code}`);
        });
    });
}

const createPortFilters = () => {
    return new Promise(function (resolve, reject) {
        Port.find({})
            .then((ports) => {
                let filter = '-Y "ip.dst==' + config.router.ip;
                if (ports.length == 0) {
                    filter += '"';
                    resolve(filter);
                }
                for (let i = 0; i <= ports.length; ++i) {
                    if (i == ports.length) {
                        if (ports.length > 0) {
                            filter += ' )"';
                        } else {
                            filter += '"';
                        }
                    } else if (i == 0) {
                        filter += " && ( ( tcp.dstport != " + ports[i].number + " || udp.dstport != " + ports[i].number + " )";
                    } else {
                        filter += " && ( tcp.dstport != " + ports[i].number + " || udp.dstport != " + ports[i].number + " )";
                    }
                }
                console.log("long resolve");
                resolve(filter);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

function analysePorts(data) {
    ports = formatPortData(data);
    console.log("Wireshark found " + ports.length + " ports");
    console.log(ports);
    Port.find({ number: { $in: ports } })
        .then((knownPorts) => {
            knownPorts = knownPorts.map((port) => port.number);
            ports = ports.filter((port) => {
                return !knownPorts.includes(port);
            });
            if (ports.length > 0) {
                ports.forEach((port) => {
                    createPort(port, false)
                        .then(() => {
                            console.log("Warning on port " + port + " created");
                            createAlert("Activity on router port detected", "Port " + port + " have been used but isn't whitelisted.");
                        })
                        .catch((error) => {
                            console.log("Warning on port " + port + " already exist");
                        });
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

let totalRequests = 0;

function startCountDemon() {
    // TODO : select wifi interface
    const captureInterface = "-i 4";
    const fieldPrintOption = '-T fields -E "header=n"';
    const fields = "-e ip.src";
    const lineBuffered = "-l";

    const child = spawn('".\\Wireshark\\tshark"', [captureInterface, fieldPrintOption, fields, lineBuffered], {
        shell: true,
    });

    child.stdout.on("data", (data) => {
        totalRequests += data
            .toString()
            .split(/\r?\n|\r|\n/g)
            .filter((row) => row != "").length;
    });

    child.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
    });

    child.on("error", (error) => {
        console.error(`error: ${error.message}`);
    });

    child.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
    });

    countRequests();
}

function countRequests() {
    wait(5000).then(() => {
        console.log(totalRequests);
        if (totalRequests > config.router.ddosLimit) {
            console.log("LIMIT");
            createAlert(
                "Many requests detected",
                totalRequests + " requests detected in less than 5 seconds. Tigger limit is " + config.router.ddosLimit
            );
        }
        totalRequests = 0;
        countRequests();
    });
}

function startTsharkDemon() {
    startIpDemon();
    startPortDemon();
    startCountDemon();
}

mongodb.connect();
startTsharkDemon();
