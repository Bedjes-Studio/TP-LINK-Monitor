require("dotenv").config();

let env = process.env.NODE_ENV.trim();

const dev = {
    server: {
        port: parseInt(process.env.DEV_SERVER_PORT) || 8080,
        key: parseInt(process.env.DEV_SERVER_KEY) || "azerty",
        tokenDuration: parseInt(process.env.DEV_SERVER_TOKEN_DURATION) || "24h",
    },
    mongodb: {
        host: process.env.DEV_MONGODB_HOST || "mongodb://127.0.0.1",
        port: parseInt(process.env.DEV_MONGODB_PORT) || 27017,
        name: process.env.DEV_MONGODB_NAME || "TP-LINK-Monitor",
    },
};

const prod = {
    server: {
        port: parseInt(process.env.PROD_SERVER_PORT) || 80,
        key: parseInt(process.env.PROD_SERVER_KEY) || "azerty",
        tokenDuration: parseInt(process.env.PROD_SERVER_TOKEN_DURATION) || "24h",
    },
    mongodb: {
        host: process.env.PROD_MONGODB_HOST || "127.0.0.1",
        port: parseInt(process.env.PROD_MONGODB_PORT) || 27017,
        name: process.env.PROD_MONGODB_NAME || "PROD-TP-LINK-Monitor",
    },
};

const config = {
    dev,
    prod,
};

console.log(config[env]);

module.exports = config[env];
