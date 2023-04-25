# TP-LINK-Monitor

Monitor app for TP-LINK rooter.

# Requirements

-   NodeJS
-   MongoDB
-   Python 3.0
-   npm dependencies

# Installation

Install NodeJS, MongoDB and Python 3.0 (or higher) first then install npm dependencies. Postinstall script will also install python dependencies.

```bash
npm install
```

Create MongoDB content :

```bash
npm run filldb-dev
```

Create `.env` file at the root and add your mail and credentials in environment variable `DEV_MAIL_USER` and `DEV_MAIL_PASSWORD`.

# Running

You will need 3 terminals. 1 for the server and 2 for the analyser.

Run local server :

```bash
npm run nodemon-dev # production mode
npm run nodemon-sim # or simulation mode
```

Run consumption analyser :

```bash
npm run consumptionAnalyser # production mode
npm run consumptionAnalyser-sim # or simulation mode
```

Run network analyser :

```bash
npm run networkAnalyser # there is no simulation mode
```

If you run in simulation mode, you need to start python script to simulate power consumption. In the GUI, you can trigger DDoS attack and see how the tools responds.

```bash
npm run simulate
```

# Custom environment

You can custom our environment by writing environment variable in a .env file at the root of the project. Variables are :

-   SERVER_PORT : port of the server
-   SERVER_KEY : key for jwt token
-   SERVER_TOKEN_DURATION : jwt token duration
-   MONGODB_HOST : mongodb host adress
-   MONGODB_PORT : mongodb port
-   MONGODB_NAME : name of the table mongodb
-   FILE_CONSUMPTION : name of the file containing electric consumption
-   MAIL_USER : mail used to send alerts
-   MAIL_PASSWORD : password of email (app key for gmail)
-   ROUTER_IP : gateway ip to check ports
-   DDOS_LIMIT : requests maximum before trigger ddos alert

They are prefixed by DEV* or SIM* depending on the mode you run the tool. Exemple : SIM_SERVER_PORT

