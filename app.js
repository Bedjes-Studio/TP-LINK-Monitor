const express = require("express");
const mongoose = require('mongoose');
const config = require('./config');
const cookieParser = require("cookie-parser");

const cookie = require("./middleware/cookie");
const frontRoutes = require("./routes/front");
const apiRoutes = require("./routes/api");

/*
 * Setup Express
 */

const app = express();
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");

/* 
* Setup Mongodb
*/

mongoose.connect(config.mongodb.host + ":" + config.mongodb.port + "/" + config.mongodb.name,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB using port " + config.mongodb.port))
    .catch(() => console.log("Connection to MongoDB failed !"));

/*
 * Setup routes
 */

app.get("/online", (req, res, next) => {
    res.status(200).json({
        message: "server is online",
    });
});

app.use("/static", express.static("./static"));
app.use("/api", cookie, apiRoutes);
app.use("/", cookie, frontRoutes);

module.exports = app;
