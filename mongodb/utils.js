const User = require("../models/user");
const Client = require("../models/client");
const Alert = require("../models/alert");

exports.dropTables = () => {
    return Promise.all([User.deleteMany({}), Client.deleteMany({}), Alert.deleteMany({})]).then((values) => {
        deletedEntries = values[0].deletedCount + values[1].deletedCount + values[2].deletedCount;
        console.log("- Deleted entries : " + deletedEntries);
    });
};
