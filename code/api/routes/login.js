const express = require('express');

function routes(UserProfile) {
  const router = express.Router();
  router.route('/')
    .post((req, res) => {
      UserProfile.login(req.body, (err, token, body) => {
        if (err) {
          console.log(err);
          return res.send();
        }
        //TODO https?
        res.cookie("jwt", token, {secure: false, httpOnly: false});
        return res.send(body);
      });
    });

  return router;
}

module.exports = routes;
