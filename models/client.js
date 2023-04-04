const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
    ip: { type: String, required: true },
    whitelisted: { type: String, required: true },
});

module.exports = mongoose.model("client", clientSchema);
