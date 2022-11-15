const express = require('express');
const db = require("../db");
const {ansibleExecute} = require("../deployments/run_ansible");
const {SPACES_LIST} = require("../db/spaces_list");
const router = express.Router();

router.post('/', async(req, res) => {
    const {name="", surname="", country = "", email=""} = req.body;
    const spacesAndEmailsInDB  =  await db.pool.query("SELECT space,email from deployments");
    const isDataAlreadyInUse = spacesAndEmailsInDB.find(({ email: _email})=> _email === email);
    const allSpacesInUseSet = new Set(spacesAndEmailsInDB.map(({space})=> space));
    const space = SPACES_LIST.find(space => !allSpacesInUseSet.has(space));

    if (![name, surname, country, email].every(Boolean) || isDataAlreadyInUse || !space) {
        res.send({
            status: "ERROR"
        });
        return;
    }

    try {
        console.log("Trying to register user ", {first_name: name,
            last_name: surname,
            user_email_Id: email,
            country_code: country,
            space_name: space});
        const ansibleResult = await ansibleExecute({
            first_name: name,
            last_name: surname,
            user_email_Id: email,
            country_code: country,
            space_name: space,
        });
        const executionTime = new Date();
        console.log("Ansible Execution: ",executionTime.toUTCString(),
            ansibleResult);
        if (typeof(ansibleResult) === "string" &&  ansibleResult.indexOf("fatal: [localhost]: FAILED!") !== -1) {
            res.send({
                status: "ERROR"
            });
            return;
        }
    } catch (err){
        console.error(err);
        if (err.stdout)
        res.send({
            status: "ERROR",
            // parse error
            // message: err?.stdout ?  err?.stdout : "Error"
            message: "Error"
        });
        return;
    }


    try {
        const values = [name, surname, country, email, space];
        const result = await db.pool.query("INSERT INTO deployments(name, surname, country, email, space) values (?,?,?,?,?)", values);
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
