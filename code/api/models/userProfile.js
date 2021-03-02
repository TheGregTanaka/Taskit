const sql = require("../db.js");

const UserProfile = function(user) {
  this.email = user.email;
  this.name = user.name;
  this.profilePicture = user.profilePicture;
  this.phone = user.phone;
  this.bio = user.bio;
};

UserProfile.create = (newUser, result) => {
  sql.executeQuery("INSERT INTO userProfile SET ?", newUser, (err, res) => {
    if (err) {
      //TODO better error handling
      console.log("ERROR! : ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

UserProfile.getOne = (userID, result) => {
  console.log(`up.getOne ${userID}`);
  sql.executeQuery(
    `SELECT 
       email, 
       name, 
       profilePicture, 
       phone,
       bio
     FROM userProfile
     WHERE id = ${ userID }`, (err, res) => {
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

UserProfile.update = (id, user, result) => {
  sql.executeQuery(
    `UPDATE userProfile 
     SET
       email = ?
       name = ?
       profilePicture = ?
       phone = ?
       bio = ?
     WHERE
       id = ?`,
    [user.email, user.name, user.profilePicture, user.phone, user.bio, id],
    (err, res) => {
      if (err) {
        //TODO better error handling
        console.log("ERROR! : ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

UserProfile.delete = (id, result) => {
  sql.executeQuery("DELETE FROM userProfile WHERE id = ?", id, (err, res) => {
    if (err) {
      //TODO better error handling
      console.log("ERROR! : ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user: ", { id: id, ...user });
    result(null, res);
  }
  );
};

module.exports = UserProfile;