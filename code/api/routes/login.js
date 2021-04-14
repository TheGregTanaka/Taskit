const express = require('express');
const errorType = require('../config/enums.js');


function routes(UserProfile) {
  const router = express.Router();
  router.route('/')
    .post((req, res) => {
      UserProfile.login(req.body, (err, token, body) => {
        console.log(err);
        if (err == errorType.BAD_REQUEST) {
          res.status(403);
          return res.send("Bad Password!");
        } else if (err == errorType.BAD_REQUEST) {
          //todo redirect to login
          res.status(409);
          return res.send("No user found with that email.");
        } else if (err == errorType.DATABASE_ERROR) {
          res.status(500);
          return res.send("Database error");
        } else if (err) {
          res.status(501);
          return res.json("Server error");
        }

        res.cookie("jwt", token, {secure: false, httpOnly: false});
        return res.send(body);
      });
    });

  return router;
}

module.exports = routes;
