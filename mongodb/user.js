const bcrypt = require("bcrypt");
const User = require("../models/user");

const users = [
    { username: "admin", password: "admin" }
];

exports.userFiller = () => {
    users.forEach((user) => {
        user.password = bcrypt.hashSync(user.password, 10);
    });

    return User.insertMany(users)
        .then((data) => {
            console.log( "- " + data.length + " users created");
            return;
        })
        .catch((error) => {
            console.log("unable to create users");
            console.log(error);
            process.exit(1);
        });
};
