var pool = require('./config/datapool');

exports.executeQuery = function(query, callback) {
  pool.getConnection(function(err, connection) {
    if (err) {
      callback(err);
      return;
    }   
    connection.query(query, function(err, results) {
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
