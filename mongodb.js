const mongoose = require("mongoose");
const config = require("./config");

function connect() {
    mongoose
        .connect(config.mongodb.host + ":" + config.mongodb.port + "/" + config.mongodb.name, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("Connected to MongoDB using port " + config.mongodb.port))
        .catch(() => console.log("Connection to MongoDB failed !"));
}
exports.connect = connect;
