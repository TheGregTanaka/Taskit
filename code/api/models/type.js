const sql = require('../db.js');

const Type = function(user) {
    this.id = user.id;
}

Type.get = (req, result) => {
    var typeID = req.params.typeID;
    var query = `SELECT *
                    From task
                    WHERE statusID=1 and typeID= ${typeID};`;
    sql.executeQuery(query, (err, res) => {
        if (err) { console.log(err); result(err, null); }
        if (res) { result(null, res['rows']); }
        return;
    });
};

module.exports = Type;