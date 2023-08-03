const nodemailer = require('nodemailer');
const process = require("node:process");
const { GMAIL, GMAIL_PASSWORD, EMAIL_SUBSCRIBERS } = process.env;

function sendEmailToSubscribers(data){
    const {email, country, name, surname} = data;
    if (!GMAIL_PASSWORD || !GMAIL) {
        console.error("Gmail credentials are not provided")
        return null;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: GMAIL,
            pass: GMAIL_PASSWORD,
        },
    });


    transporter.sendMail({
        from: GMAIL,
        to: EMAIL_SUBSCRIBERS,
        subject: "New registration hpe-df ✔", // Subject line
        html: letterRenderer({name, surname, country, email}),
    }).then(info => {
        console.log({info});
    }).catch(console.error);
}

function letterRenderer({email, country, name, surname}){
    return `<br>
    Contact information:<br>
    ____________________________________<br>
    
    Name: ${name}<br>
    Last name: ${surname}<br>
    Email: ${email}<br>
    Country: ${country}<br>
    <br><br>
    Google sheet: <br>
    
    <a href="https://docs.google.com/spreadsheets/d/19veFFpLN5mV1pI1Ils7CIbWdO_Iv9QmKYWiB0pVJ9Mk/edit?usp=sharing" target="_blank">Link</a>
    <br>
    _____________________________________<br>
    `
}

module.exports = Object.freeze({
    sendEmailToSubscribers
});

