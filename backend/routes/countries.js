const express = require('express');
const router = express.Router();
const {withStatusOk} = require("../utils/utils");

const {getCountries} = require("../db/data");

router.get('/', async (req, res) => {
    const countries = await getCountries();
    res.send(withStatusOk(countries));
});

module.exports = router;