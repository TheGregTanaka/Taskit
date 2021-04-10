const sql = require("../db.js");

const Task = function (user) {
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
    task.taskerID,
    task.img,
    tasker.name as tasker,
    task.workerID, 
    worker.name as worker,
    task.datePosted,
    task.dateCompleted,
    task.price,
    task.address,
    tasker.phone,
    tasker.email
  FROM task 
  JOIN typeTask ON task.typeID = typeTask.id
  JOIN statusTask ON task.statusID = statusTask.id
  JOIN userProfile as tasker ON task.taskerID = tasker.id
  LEFT JOIN userProfile as worker ON task.workerID = worker.id`;

Task.create = (newTask, result) => {
  let kStr, vStr;
  //newTask = newTask.task
  kStr = vStr = "(";
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
};

Task.get = (req, result) => {
  var query = {};
  if (req.query.status) {
    query.status = req.query.status;
  }
  if (req.query.type) {
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
      result(null, res["rows"]);
      return;
    } else {
      console.log("ERROR" + JSON.stringify(res));
      result("Error: " + JSON.stringify(res), null);
      return;
    }
  });
};

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
      result(null, res["rows"]);
      return;
    } else {
      console.log("Res no length" + JSON.stringify(res));
      result("No Data returned", null);
      return;
    }
  });
};


Task.getFeed = (req, result) => {
  const pending = "Pending";
  var q = queryStr + ` WHERE task.statusID = 1`;


  sql.executeQuery(q, (err, res) => {
    if (err) {
      //TODO better error handling
      console.log("ERROR! : ", err);
      result(err, null);
      return;
    }
    if (res) {
      result(null, res["rows"]);
      return;
    } else {
      console.log("ERROR" + JSON.stringify(res));
      result("No Data returned", null);
      return;
    }
  });
};

Task.byUser = (type, req, result) => {
  const id = req.params.id;
  var query = {};
  if (req.query.status) {
    query.status = req.query.status;
  }
  if (req.query.type) {
    query.type = req.query.type;
  }
  var q = queryStr + ' WHERE '
  if (type == 0) {
    q += 'taskerID = ';
  } else if (type == 1) {
    q += 'workerID = ';
  } else {
    console.log("Error, invalid type");
    result("Invalid user type", null);
    return;
  }
  q += id;
  if (Object.keys(query).length > 0) {
     q += " AND ";
     var first = true;
     for (const key in query) {
       q += first ? "" : " AND ";
       q += `${key}ID = ${query[key]}`;
       first = false;
     }
   }
  sql.executeQuery(q, (err, res) => {
    if (err) {
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
      result("No Data returned", null);
      return;
    }
  });
};

Task.getPending = (req, status, result) => {
  var id = req.params.id;

  var query = queryStr + `WHERE workerID = ${id} AND statusTask.status = "${status}";`;

  sql.executeQuery(query, (err, res) => {
    if (err) { console.log(err); result(err, null); }
    if (res) { result(null, res['rows']); }
    return;
  });
  return;
};
	
Task.update = (id, task, result) => {
  console.log(id);
  console.log(task);
  var updateStr = `UPDATE task SET`;
  for (const key in task) {
    updateStr += ` ${key} = "${task[key]}",`;
  }
  //remove final comma
  updateStr = updateStr.substring(0, updateStr.length - 1);
  updateStr += ` WHERE id = ${id};`;

  sql.executeQuery(updateStr, (err, res) => {
    if (err) {
      console.log("ERROR! : ", err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("updated task: ", { id: id, ...task});
    result(null, { id: id, ...task });
  }
  );
};

Task.delete = (id, result) => {
  sql.executeQuery(`DELETE FROM task WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("ERROR! : ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows === 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted task: ", { id: id });
    result(null, res);
  }
  );
};

module.exports = Task;
