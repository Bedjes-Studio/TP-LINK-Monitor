const User = require("../models/user");
const Client = require("../models/client");
const Alert = require("../models/alert");
const Port = require("../models/port");
const Analyser = require("../models/analyser");

exports.dropTables = () => {
    return Promise.all([User.deleteMany({}), Client.deleteMany({}), Alert.deleteMany({}), Port.deleteMany({}), Analyser.deleteMany({})]).then(
        (values) => {
            deletedEntries = values[0].deletedCount + values[1].deletedCount + values[2].deletedCount;
            console.log("- Deleted entries : " + deletedEntries);
        }
    );
};
