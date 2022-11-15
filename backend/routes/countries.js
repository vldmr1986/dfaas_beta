const express = require('express');
const router = express.Router();
const {COUNTRIES_LIST} = require("../db/countries_list");
const {withStatusOk} = require("../utils/utils");

router.get('/', async (req, res) => {
    res.send(withStatusOk(COUNTRIES_LIST));
});

module.exports = router;