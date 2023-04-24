require("dotenv").config();

let env = "dev";
if (process.env.NODE_ENV != undefined) {
    env = process.env.NODE_ENV.trim();
}

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
    mail: {
        user: process.env.DEV_MAIL_USER || "IoTUQAC@gmail.com",
        password: process.env.DEV_MAIL_PASSWORD || "azerty",
    },
    router: {
        ip: process.env.DEV_ROUTER_IP || "192.168.0.1",
        ddosLimit: process.env.DEV_DDOS_LIMIT || 2000,
    },
};

const sim = {
    server: {
        port: parseInt(process.env.SIM_SERVER_PORT) || 8080,
        key: parseInt(process.env.SIM_SERVER_KEY) || "azerty",
        tokenDuration: parseInt(process.env.SIM_SERVER_TOKEN_DURATION) || "24h",
    },
    mongodb: {
        host: process.env.SIM_MONGODB_HOST || "mongodb://127.0.0.1",
        port: parseInt(process.env.SIM_MONGODB_PORT) || 27017,
        name: process.env.SIM_MONGODB_NAME || "TP-LINK-Monitor",
    },
    mail: {
        user: process.env.SIM_MAIL_USER || "IoTUQAC@gmail.com",
        password: process.env.SIM_MAIL_PASSWORD || "azerty",
    },
    router: {
        ip: process.env.SIM_ROUTER_IP || "192.168.0.1",
        ddosLimit: process.env.SIM_DDOS_LIMIT || 2000,
    },
};

const config = {
    dev,
    sim,
};

console.log(config[env]);

module.exports = config[env];
