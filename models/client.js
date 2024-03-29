const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
    ip: { type: String, required: true, unique: true },
    whitelisted: { type: Boolean, required: true },
});

module.exports = mongoose.model("client", clientSchema);
