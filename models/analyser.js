const mongoose = require("mongoose");

const analyserchema = mongoose.Schema({
    pid: { type: Number, required: true },
    type: { type: String, required: true },
    running: { type: Boolean, required: true },
});

module.exports = mongoose.model("analyser", analyserchema);
