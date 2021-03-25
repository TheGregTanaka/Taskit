const sql = require("../db.js");

const Task = function(user) {
  this.email = user.email;
  this.name = user.name;
  this.profilePicture = user.profilePicture;
  this.phone = user.phone;
  this.bio = user.bio;
};
const queryStr = `SELECT 
    task.id, 
    task.title, 
    task.typeID, 
    typeTask.type,
    task.statusID, 
    statusTask.status,
    task.description, 
    task.offeredPrice, 
    task.negotiable, 
    task.taskerID, 
    tasker.name as tasker,
    task.workerID, 
    worker.name as worker,
    task.datePosted,
    task.dateCompleted,
    task.rating
  FROM task 
  JOIN typeTask ON task.typeID = typeTask.id
  JOIN statusTask ON task.statusID = statusTask.id
  JOIN userProfile as tasker ON task.taskerID = tasker.id
  LEFT JOIN userProfile as worker ON task.workerID = worker.id`;

Task.create = (newTask, result) => {
  let kStr, vStr;
  kStr = vStr = "(";
  newTask = newTask.task;
  for (const key in newTask) {
    console.log(`k ${key} v ${newTask[key]}\n`);
    kStr += key + ",";
    vStr += `"${newTask[key]}",`;
  }
  //remove final commas
  kStr = kStr.substring(0, kStr.length - 1) + ")";
  vStr = vStr.substring(0, vStr.length - 1) + ")";

  const insertStr = `INSERT INTO task ${kStr} VALUES ${vStr};`;
  console.log(insertStr);


  sql.executeQuery(insertStr, (err, res) => {
    if (err) {
      //TODO better error handling
      console.log("ERROR! : ", err);
      result(err, null);
      return;
    }

    console.log("created task: ", { id: res.rows.insertId, ...newTask });
    result(null, { id: res.rows.insertId, ...newTask });
  });
}

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
  var q = queryStr;
  //TODO validate better and protect against sql injection
  if (Object.keys(query).length > 0) {
    q += " WHERE ";
    var first = true;
    for (const key in query) {
      q += first ? "" : " AND ";
      q += `${key}ID = ${query[key]}`;
      first = false;
    }
  }

  sql.executeQuery(q, (err, res) => {
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
  var q = queryStr + ` WHERE task.id = ${taskID}`;
  sql.executeQuery(q, (err, res) => {
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
