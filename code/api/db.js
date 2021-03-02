var pool = require('./config/datapool');

exports.executeQuery = function(query,callback) {
  pool.getConnection(function(err,connection) {
    console.log("Connection got");
    if (err) {
      console.log("Connection err");
      callback(err);
      return;
    }   
    connection.query(query,function(err,results){
      console.log("Connection query" + query);
      console.log("Connection res" + results);
      console.log("Connection err" + err);
      connection.release();
      if(!err) {
        callback(false, {rows: results});
      }           
    });
    connection.on('error', function(err) {      
      callback(err);
      return;     
    });
  });
}
