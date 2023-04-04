# TP-LINK-Monitor

Monitor app for TP-LINK rooter.

# Requirements

- NodeJS
- MongoDB
- npm dependencies

# Installation

Install NodeJS and MongoDB first then install npm dependencies :

```bash
npm install
```

Create MongoDB content :

```bash
npm run filldb-dev
```

Create `.env` file at the root and add your mail and credentials in environment variable `DEV_MAIL_USER` and `DEV_MAIL_PASSWORD`.

Run local server :
```
npm run nodemon-dev
```

Default credentials are admin/admin, change them !