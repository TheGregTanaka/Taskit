require('dotenv').config();
const mysql = require('mysql');
var datapool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.SCHEMA,
  debug: false
});
datapool.on('connection', function(connection) {
   connection.on('error', function(err) {
     console.error(new Date(), 'MySQL error', err.code);
   });
  connection.on('close', function(err) {
    console.error(new Date(), 'MySQL close', err);
  });
});
module.exports = datapool;
