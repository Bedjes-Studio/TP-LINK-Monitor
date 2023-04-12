// const slowFunction = () => {
//     let counter = 0;
//     while (counter < 5000000000) {
//         counter++;
//     }

//     return counter;
// };

// process.on("message", (message) => {
//     if (message == "START") {
//         console.log("Child process received START message");
//         let slowResult = slowFunction();
//         let message = `{"totalCount":${slowResult}}`;
//         process.send(message);
//     }
// });

const { spawn } = require("child_process");

function startTsharkDemon() {
    const captureInterface = "-i 4";
    const displayFilter = '-Y "tcp.port == 443"';
    const fieldPrintOption = '-T fields -E "header=n"';
    const fields = "-e ip.src";

    const child = spawn('".\\Wireshark\\tshark"', [captureInterface, fieldPrintOption, fields], { shell: true });
    //
    child.stdout.on("data", (data) => {
        console.log(`# stdout new data`);
        process.send(data.toString());
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
}

process.on("message", (message) => {
    if (message == "START") {
        console.log("Tshark process received START message");
        startTsharkDemon();
    }
});

startTsharkDemon();
