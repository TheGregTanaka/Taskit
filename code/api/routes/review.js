const express = require('express');
const sql = require("../db.js");
const router = express.Router();


router.get('/review/create_review', (req, res) => {
  var queryParams = req.query;
  console.log(queryParams);

  sql.executeQuery(`SELECT * from review WHERE ${queryParams.id} = id`,
  (err, query_res) => {
    if(err) { console.log('err', err); }
    else {
        res.json(query_res.rows);
    }
  });
})


module.exports = router;