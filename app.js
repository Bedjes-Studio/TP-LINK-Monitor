const express = require("express");
const cookieParser = require("cookie-parser");

const mongodb = require("./mongodb");
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

mongodb.connect();

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
