const mongoose = require("mongoose");

const portSchema = mongoose.Schema({
    number: { type: Number, required: true, unique: true },
    open: { type: Boolean, required: true },
});

module.exports = mongoose.model("port", portSchema);
