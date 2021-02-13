var mysql = require('mysql');

var conn = mysql.createConnection({
    host: "172.17.0.2",
    user: "root",
    password: "Task123",
    database: "taskitDb"
});

conn.connect(function(err) {
    if (err) throw err;
    conn.query("SELECT * FROM userProfiles", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});
