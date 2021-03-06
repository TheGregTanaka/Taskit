const sql = require("../db.js");

const Task = function(user) {
  this.email = user.email;
  this.name = user.name;
  this.profilePicture = user.profilePicture;
  this.phone = user.phone;
  this.bio = user.bio;
};

Task.create = (newTask, result) => {
  sql.executeQuery("INSERT INTO task SET ?", newTask, (err, res) => {
    if (err) {
      //TODO better error handling
      console.log("ERROR! : ", err);
      result(err, null);
      return;
    }

    console.log("created task: ", { id: res.insertId, ...newTask });
    result(null, { id: res.insertId, ...newTask });
  });
};

Task.get = (req, result) => {
  var query = {};
  if (req.query.status) {
    console.log('stat!');
    query.status = req.query.status;
  }
  if (req.query.type) {
    console.log('type!');
    query.type = req.query.type;
  }
  var queryStr = `SELECT id, 
      title, 
      typeID, 
      statusID, 
      description, 
      offeredPrice, 
      negotiable, 
      taskerID, 
      workerID, 
      datePosted,
      dateCompleted,
      rating
    FROM task`;
  //TODO validate better and protect against sql injection
  if (Object.keys(query).length > 0) {
    console.log('!!');
    queryStr += " WHERE ";
    var first = true;
    for (const key in query) {
      queryStr += first ? "" : " AND ";
      queryStr += `${key}ID = ${query[key]}`;
      first = false;
    }
  }

  sql.executeQuery(queryStr, (err, res) => {
    if (err) {
      //TODO better error handling
      console.log("ERROR! : ", err);
      result(err, null);
      return;
    }
    if (res) {
      result(null, res['rows']);
      return;
    } else {
      console.log("ERROR" + JSON.stringify(res));
      return("HECC", null);
    }
  });
}

Task.getOne = (taskID, result) => {
  //TODO better query
  console.log(`task.getOne ${taskID}`);
  sql.executeQuery(
    `SELECT *
     FROM task
     WHERE id = ${ taskID }`, (err, res) => {
       if (err) {
         //TODO better error handling
         console.log("ERROR! : ", err);
         result(err, null);
         return;
       }
       if (res) {
         console.log("found: ", JSON.stringify(res));
         result(null, res['rows']);
         return;
       } else {
         console.log("Res no length" + JSON.stringify(res));
         return("HECC", null);
       }
     });
};

Task.update = (id, user, result) => {
  //TODO
};

Task.delete = (id, result) => {
  //TODO
};

module.exports = Task;
