const express = require('express');
const router = express.Router();
const db = require('../db');

const {SPACES_LIST} = require("../db/spaces_list");
const {withStatusOk} = require("../utils/utils");

router.get('/', async (req, res) => {
  try {
    const db_result = await db.pool.query("select space from deployments") || [];

    const handledResult = db_result.map(({space})=> space);
    const handledResultSet = new Set([...handledResult]);
    const data = SPACES_LIST.filter(space=> !handledResultSet.has(space))
    res.send(withStatusOk(data));
  } catch (e) {
  }
});

module.exports = router;