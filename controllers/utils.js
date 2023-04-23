const fs = require("fs");
const { parse } = require("csv-parse");

exports.errorHandler = (error, res) => {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
};

exports.wait = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
};

exports.readCsvFromLine = (filepath, line) => {
    return new Promise((resolve, reject) => {
        const data = [];

        fs.createReadStream(filepath)
            .pipe(
                parse({
                    delimiter: ",",
                    from_line: line,
                })
            )
            .on("data", function (row) {
                data.push({ value: row[0], timestamp: row[1] });
            })
            .on("error", (error) => {
                reject(error);
            })
            .on("end", () => {
                resolve(data);
            });
    });
};
