const nodemailer = require("nodemailer");

const { errorHandler } = require("./utils");
const config = require("../config");
const User = require("../models/user");

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

function sendMailToAdmins(subject, text) {
    User.find({})
        .then((users) => {
            users.foreach((user) => {
                sendMail(user.email, subject, text);
            });
        })
        .catch((error) => {
            errorHandler(error, res);
        });
}

exports.sendMail = sendMail;
exports.sendMailToAdmins = sendMailToAdmins;
