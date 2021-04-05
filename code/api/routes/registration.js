const express = require('express');

function routes(Registration) {
    const router = express.Router();
    router.route('/')

      .post((req, res) => {
        UserProfile.create(req.body, (err, token, body) => {
          if (err) {
            console.log(err);
            return res.sendStatus(401);         
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
