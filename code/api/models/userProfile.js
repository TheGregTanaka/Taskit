const sql = require("../db.js");

const UserProfile = function(user) {
  this.email = user.email;
  this.name = user.name;
  this.profilePicture = user.profilePicture;
  this.phone = user.phone;
  this.bio = user.bio;
};


UserProfile.create = (newUser, result) => {
  console.log(newUser);
  //TODO validate email field exists? Should be required field by form
  //check if existing user
  sql.executeQuery(`SELECT email FROM userProfile WHERE email = "${newUser['email']}";`, 
    (err, res) => {
      if (err) {console.log(err);}
      if (res['rows'].length > 0) {
        //TODO send redirect to login page
        const msg = "User already exists! Doing nothing.";
        console.log(msg);
        result(null, msg);
        return;
      } else {
        let kStr, vStr;
        kStr = vStr = "(";
        for (const key in newUser) {
          console.log(`k ${key} v ${newUser[key]}\n`);
          kStr += key + ",";
          vStr += `"${newUser[key]}",`;
        }
        //remove final commas
        kStr = kStr.substring(0, kStr.length - 1) + ")";
        vStr = vStr.substring(0, vStr.length - 1) + ")";

        const insertStr = `INSERT INTO userProfile ${kStr} VALUES ${vStr};`;
        sql.executeQuery(insertStr, (err, res) => {
          if (err) {
            //TODO better error handling
            console.log("ERROR! : ", err);
            result(err, null);
            return;
          }

          //console.log("created user: ", { id: res.rows.insertId, ...newUser });
          result(null, JSON.stringify({ id: res.rows.insertId, ...newUser }));
        });
      }
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
  console.log(id);
  var updateStr = `UPDATE userProfile SET`;
  for (const key in user) {
    updateStr += ` ${key} = "${user[key]}",`;
  }
  //remove final comma
  updateStr = updateStr.substring(0, updateStr.length - 1);
  updateStr += ` WHERE id = ${id};`;
  sql.executeQuery(updateStr, (err, res) => {
    if (err) {
      //TODO better error handling
      console.log("ERROR! : ", err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("updated user: ", { id: id, ...user });
    result(null, { id: id, ...user });
  }
  );
};

UserProfile.delete = (id, result) => {
  sql.executeQuery(`DELETE FROM userProfile WHERE id = ${id}`, (err, res) => {
    if (err) {
      //TODO better error handling
      console.log("ERROR! : ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows === 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user: ", { id: id });
    result(null, res);
  }
  );
};

//utilities - maybe create controllers class?
UserProfile.calcRating = (userID) => {
  //get tasks this user has completed
  //calculate the average rating of those tasks
  //k
}

module.exports = UserProfile;
