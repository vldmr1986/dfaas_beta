const express = require('express');
const db = require("../db");
const {ansibleExecute} = require("../deployments/run_ansible");
// const {getSpaceNames} = require("../db/data");
const {validateSignup, parseAnsibleResponse} = require("../utils/validationUtils");
const {excelAppendRow} = require("../services_internal/google/sheets");
const {sendEmailToSubscribers} = require("../services_internal/google/emailSender");
const router = express.Router();

router.post('/', async(req, res) => {
    const {name="", surname="", country = "", email=""} = req.body;
    const emailsInDB  =  await db.pool.query("SELECT email from deployments");
    const isEmailInUse = !!emailsInDB.find(({ email: _email})=> _email === email)?.email;

    const  {isValid, errorsMessages} = validateSignup({name, surname, country, email, isEmailInUse});

    if (!isValid) {
        res.send({
            status: "ERROR",
            message: errorsMessages
        });
        return;
    }

        console.log("Trying to register user ", {
            first_name: name,
            last_name: surname,
            user_email_Id: email,
            country_code: country,
        });

    try {
        const values = [name, surname, country, email];
        const result = await db.pool.query("INSERT INTO deployments(name, surname, country, email) values (?,?,?,?)", values);
        const dbResult = result && result[0];
        const responseToUser = dbResult || {
            status: "OK"
        }

        res.send(responseToUser);

        excelAppendRow({
            name, surname, country, email
        });
        sendEmailToSubscribers({
            name, surname, country, email
        });

    } catch (err) {
        console.log("error", err);
        res.send({
            status: "ERROR"
        });
    }
});

module.exports = router;
