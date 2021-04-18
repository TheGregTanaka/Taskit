require('dotenv').config();
const sql = require("../db.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const errorType = require('../config/enums.js');
const saltRounds = 10;

const UserProfile = function(user) {
  this.email = user.email;
  this.name = user.name;
  this.phone = user.phone;
  this.bio = user.bio;
};



UserProfile.create = (newUser, result) => {
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
      } 
      else {
        bcrypt.hash(newUser['password'], saltRounds, function(err, hash) {
        if(hash){
        const insertStr = `INSERT INTO userProfile (email,name,password) VALUES ('${newUser['email']}', '${newUser['name']}', '${hash}');`;
        sql.executeQuery(insertStr, (err, res) => {
          if (err) {
            //TODO better error handling
            console.log("ERROR! : ", err);
            result(err, null);
            return;
          };
        
          UserProfile.createCookie(newUser['email'],res.rows.insertId,(err, token) =>{
            if(err){
            console.log("ERROR! : ", err);
            result(err, null);
            return;
            };
            result(null,{id: res.rows.insertId, email:newUser['email']},token);
          });
        });
        return;
      };
        });
      };
    });
  };


UserProfile.getOne = (userID, result) => {
  sql.executeQuery(
    `SELECT 
       email, 
       name, 
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
         result(null, res['rows']);
         return;
       } else {
         console.log("Res no length" + JSON.stringify(res));
         return("No data", null);
       }
     });
};

UserProfile.update = (id, user, result) => {
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

    result(null, res);
  }
  );
};

UserProfile.login = (req, result) => {
  //verify email and pass match stored creds
  const email = req.email;
  var id;
  var dbPw;
  var accessToken, refreshToken;
  sql.executeQuery(`SELECT id, password FROM userProfile WHERE email = "${email}";`, 
    (err, res) => {
      if (err) {
        //buble up TODO better message
        result(err, null, null);
        return;
      }
      if (res.rows.length > 1) {
        result(errorType.DATABASE_ERROR, null, null);
        return;
      }
      if (res.rows.length === 0) {
        result(errorType.DOES_NOT_EXIST, null, null);
        return;
      }
      id = res['rows'][0].id;
      dbPw = res['rows'][0].password;
      //short curcuit return if error or mismatch.
      bcrypt.compare(req.password, dbPw, (error, match) => {
        if (error) {
          result(error, null, null);
          return;
        }
        if (!match) {
          result(errorType.BAD_REQUEST, null, null);
          return;
        } else {
          UserProfile.createCookie(id, email, (err, at) => {
            if (err) {
              console.log(err);
              result(err, null, null);
              return;
            }
            result(null, at, {'id':id, 'email':email});
            return;
          });
        }
      });
    }
  );
}

UserProfile.createCookie = (id, email, res) => {
  const payload = {email: email}
  accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: `${process.env.ACCESS_TOKEN_LIFE}s`
  });
  refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: `${process.env.REFRESH_TOKEN_LIFE}s`
  });

  //store refresh token in DB
  sql.executeQuery(`UPDATE userProfile SET token = "${refreshToken}" WHERE id = ${id};`,
    (e, r) => {
      if (e) {
        res(e, null);
        return;
      }
    }
  );

  res(null, accessToken);
  return;
}


//utilities - maybe create controllers class?
UserProfile.calcRating = (userID) => {
  //get tasks this user has completed
  //calculate the average rating of those tasks
  //k
}

module.exports = UserProfile;
