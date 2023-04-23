const { spawn } = require("child_process");

const mongodb = require("./mongodb");
const Client = require("./models/client");
const { createClient } = require("./controllers/client");

function startTsharkDemon() {
    const captureInterface = "-i 4";
    const fieldPrintOption = '-T fields -E "header=n"';
    const fields = "-e ip.src";
    const lineBuffered = "-l";

    createIPFilters().then((filter) => {
        const child = spawn('".\\Wireshark\\tshark"', [captureInterface, filter, fieldPrintOption, fields, lineBuffered], { shell: true });

        child.stdout.on("data", (data) => {
            analyseIps(data.toString());
        });

        // child.stderr.on("data", (data) => {
        //     console.error(`stderr: ${data}`);
        // });

        // child.on("error", (error) => {
        //     console.error(`error: ${error.message}`);
        // });

        // child.on("close", (code) => {
        //     console.log(`child process exited with code ${code}`);
        // });
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
                        filter += " || ip.src != " + clients[i].ip;
                    }
                }
                resolve(filter);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

function formatData(data) {
    let formattedData = data.split(/\r?\n|\r|\n/g); // split lines
    formattedData.pop(); // remove empty last line
    return [...new Set(formattedData)]; // remove duplicates
}

function analyseIps(data) {
    ips = formatData(data);

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
                            // TODO : kill child process and spawn again
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

mongodb.connect();
startTsharkDemon();
