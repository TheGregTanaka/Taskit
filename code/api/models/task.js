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
    tasker.name as tasker,
    task.workerID, 
    worker.name as worker,
    task.datePosted,
    task.dateCompleted,
    task.price,
    task.address,
    task.city,
    task.state,
    task.zip,
    task.country,
    tasker.phone,
    tasker.email
  FROM task 
  JOIN typeTask ON task.typeID = typeTask.id
  JOIN statusTask ON task.statusID = statusTask.id
  JOIN userProfile as tasker ON task.taskerID = tasker.id
  LEFT JOIN userProfile as worker ON task.workerID = worker.id`;

Task.create = (newTask, result) => {
  let kStr, vStr;
  kStr = vStr = "(";
  for (const key in newTask) {
    kStr += key + ",";
    vStr += `"${newTask[key]}",`;
  }
  //remove final commas
  kStr = kStr.substring(0, kStr.length - 1) + ")";
  vStr = vStr.substring(0, vStr.length - 1) + ")";

  const insertStr = `INSERT INTO task ${kStr} VALUES ${vStr};`;

  sql.executeQuery(insertStr, (err, res) => {
    if (err) {
      //TODO better error handling
      console.log("ERROR! : ", err);
      result(err, null);
      return;
    }

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
  var q = queryStr + ` WHERE task.statusID = 1`;

  if (req.query.type) {
    q += ` AND task.typeID = ${req.query.type}`;
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
      result(null, res['rows']);
      return;
    } else {
      console.log("Res no length" + JSON.stringify(res));
      result("No Data returned", null);
      return;
    }
  });
};

Task.filterTaskStatus_worker = (req, status, result) => {
  var id = req.params.id;

  var query = queryStr + `WHERE workerID = ${id} AND statusTask.status = "${status}";`;

  sql.executeQuery(query, (err, res) => {
    if (err) { console.log(err); result(err, null); }
    if (res) { result(null, res['rows']); }
    return;
  });
  return;
};

Task.getPendingPayment = (req, result) => {
  var id = req.params.id;
  var query = queryStr + ` WHERE taskerID = ${id} AND statusID=4;`;

  sql.executeQuery(query, (err, res) => {
    if (err) { console.log(err); result(err, null); }
    if (res) { result(null, res['rows']); }
    return;
  });
  return;
};

Task.getRequiredConfirmation = (req, result) => {
  var id = req.params.id;

  var query = queryStr + ` WHERE taskerID = ${id} AND statusID=3;`;

  sql.executeQuery(query, (err, res) => {
    if (err) { console.log(err); result(err, null); }
    if (res) { result(null, res['rows']); }
    return;
  });
  return;
};
	
Task.update = (id, task, result) => {
  if(task.hasOwnProperty('data')) { task = task.data; }
  
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

    result(null, { id: id, ...task });
  }
  );
};

Task.delete = (id, result) => {
  sql.executeQuery(`DELETE FROM task WHERE id = ${id} AND workerID is NULL;`, (err, res) => {
    if (err) {
      console.log("ERROR! : ", err);
      result(err, null);
      return;
    }

    if (res.rows.affectedRows == 0) {
      result({ kind: "not_found or workerID is not null" }, null);
      return;
    }

    result(null, res);
  }
  );
};

Task.drop = (id, task, result) => {
  var query = `UPDATE task 
                SET statusID = 1, workerID = NULL
                WHERE id = ${id};`
  sql.executeQuery(query, (err, res) => {
    if (err) { console.log(err); result(err, null); }
    if (res) { result(null, res['rows']); }
    return;
  });
};

Task.deleteComplete = (id, result) => {
  var query = `DELETE FROM task WHERE id = ${id} AND statusID=5;`
  sql.executeQuery(query, (err, res) => {
    if (err) { console.log(err); result(err, null); }
    if (res) { result(null, res['rows']); }
    return;
  });
};

module.exports = Task;
