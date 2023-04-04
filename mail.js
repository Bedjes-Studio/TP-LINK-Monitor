const nodemailer = require("nodemailer");
const config = require('./config');

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.mail.user,
        pass: config.mail.password,
    },
});

function sendMail(to, subject, text) {
    let mailOptions = {
        from: config.mail.user,
        to: to,
        subject: subject,
        text: text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

exports.sendMail = sendMail;

// USAGE
// const {sendMail} = require("../mail");
// sendMail(to, subject, text)