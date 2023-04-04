const mongoose = require("mongoose");

const alertSchema = mongoose.Schema({
    type: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
});

module.exports = mongoose.model("alert", alertSchema);
