const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "IoTUQAC@gmail.com",
        pass: "",
    },
});

var mailOptions = {
    from: "IoTUQAC@gmail.com",
    to: "IoTUQAC@gmail.com",
    subject: "Sending Email using Node.js",
    text: "That was easy!",
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log("Email sent: " + info.response);
    }
});
