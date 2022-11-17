const express = require('express');
const router = express.Router();
const db = require('../db');

const {withStatusOk} = require("../utils/utils");
const {getSpaceNames} = require("../db/data");

router.get('/', async (req, res) => {
  try {
    const db_result = await db.pool.query("select space from deployments") || [];

    const handledResult = db_result.map(({space})=> space);
    const handledResultSet = new Set([...handledResult]);

    const spaceNames = await getSpaceNames();

    const data = spaceNames.filter(space=> !handledResultSet.has(space))
    res.send(withStatusOk(data));
  } catch (e) {
  }
});

module.exports = router;