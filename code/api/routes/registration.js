const express = require('express');
const errorType = require('../enums.js');

function routes(UserProfile) {
    const router = express.Router();
    router.route('/')

      .post((req, res) => {
        UserProfile.create(req.body, (err, token, body) => {
          if (err) {
            console.log(err);
            return res.sendStatus(401);         
          }

          else if(err == errorType.USER_EXISTS){
              res.status(400);
              return res.send("User already exists. Please go to login page");
          }

          else if(err == errorType.USER_EXISTS){
              res.status(403);
              return res.send("test");
          }


          console.log(req.body);
          console.log(req.body.name);
          res.cookie("jwt", token, {secure: false, httpOnly: false});
          return res.send(body);
        });
      });

  
    return router;
  }


  

module.exports = routes;
