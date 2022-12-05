const express = require('express');
const db = require("../db");
const {ansibleExecute} = require("../deployments/run_ansible");
// const {getSpaceNames} = require("../db/data");
const {validateSignup, parseAnsibleResponse} = require("../utils/validationUtils");
const router = express.Router();

router.post('/', async(req, res) => {
    const {name="", surname="", country = "", email=""} = req.body;
    const emailsInDB  =  await db.pool.query("SELECT email from deployments");
    const isEmailInUse = !!emailsInDB.find(({ email: _email})=> _email === email)?.email;
    // const allSpacesInUseSet = new Set(spacesAndEmailsInDB.map(({space})=> space));
    // const allSpaces = await getSpaceNames();
    // const space = allSpaces.find(space => !allSpacesInUseSet.has(space));

    const  {isValid, errorsMessages} = validateSignup({name, surname, country, email, isEmailInUse});

    if (!isValid) {
        res.send({
            status: "ERROR",
            message: errorsMessages
        });
        return;
    }

    try {
        console.log("Trying to register user ", {first_name: name,
            last_name: surname,
            user_email_Id: email,
            country_code: country,
            // space_name: space
        });
        const ansibleResult = await ansibleExecute({
            first_name: name,
            last_name: surname,
            user_email_Id: email,
            country_code: country,
            tenantId: process.env.tenantId,
            issuer: process.env.issuer,
            api_client_id: process.env.api_client_id,
            api_client_secret: process.env.api_client_secret,
            // space_name: space,
        });
        const executionTime = new Date();
        console.log("Ansible Execution: ",executionTime.toUTCString(),
            ansibleResult);
        const {isError, errorMessage} = parseAnsibleResponse(ansibleResult);
            res.send({
                status: isError ? "ERROR" : "OK",
                message: errorMessage,
            });
            return;

    } catch (err){
        console.error(err);
        const {errorMessage} = parseAnsibleResponse(err?.stdout);
        res.send({
            status: "ERROR",
            // parse error
            // message: err?.stdout ?  err?.stdout : "Error"
            message: errorMessage || "This user is already invited for Data Fabric beta access."
        });
        return;
    }


    try {
        const values = [name, surname, country, email];
        const result = await db.pool.query("INSERT INTO deployments(name, surname, country, email) values (?,?,?,?)", values);
        const dbResult = result && result[0];
        const responseToUser = dbResult || {
            status: "OK"
        }

        res.send(responseToUser);
    } catch (err) {
        res.send({
            status: "ERROR"
        });
        return;
    }
});

module.exports = router;
