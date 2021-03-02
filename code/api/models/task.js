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
         //console.log("found: ", res['row']);
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
