const mysql = require("mysql");
//TODO envar?
const conf = require("../config/db.dev.js");
//const conf = require("../config/db.js");

const conn = mysql.createConnection({
    host: conf.HOST,
    user: conf.USER,
    password: conf.PASSWORD,
    database: conf.SCHEMA
});

conn.connect(err => {
  if (err) throw err;
  console.log("Connected.");
});

module.exports = conn;
