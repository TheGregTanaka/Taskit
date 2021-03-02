const mysql = require('mysql');
var datapool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'taskit',
  password: 'Task123',
  database: 'taskitDb',
  debug: false
});
datapool.on('connection', function(connection) {
  console.log('DB Connected');
   connection.on('error', function(err) {
     console.log("ERROR1");
     console.error(new Date(), 'MySQL error', err.code);
   });
  connection.on('close', function(err) {
     console.log("ERROR2");
    console.error(new Date(), 'MySQL close', err);
  });
});
module.exports = datapool;
