const bcrypt = require("bcrypt");
const Analyser = require("../models/analyser");

const analysers = [
    { pid: 0, type: "Consumption", running: false },
    { pid: 0, type: "Network IP", running: false },
    { pid: 0, type: "Network port", running: false },
    { pid: 0, type: "Network DDoS", running: false },
];

exports.analyserFiller = () => {
    return Analyser.insertMany(analysers)
        .then((data) => {
            console.log("- " + data.length + " analysers created");
            return;
        })
        .catch((error) => {
            console.log("unable to create analysers");
            console.log(error);
            process.exit(1);
        });
};
