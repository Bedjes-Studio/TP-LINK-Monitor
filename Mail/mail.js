var mail = require('mail').Mail({
    host: 'smtp.gmail.com',
    username: 'IoTUQAC@gmail.com',
    password: '',
    port: 25,
    domainName: 'gmail.com'
    
});

mail.message({
    from: 'IoTUQAC@gmail.com',
    to: ['IoTUQAC@gmail.com'],
    subject: 'Hello from Node.JS'
})
    .body('Node speaks SMTP!')
    .send(function (err) {
        if (err) {
            console.log(err);
        };
        console.log('Sent!');
    });