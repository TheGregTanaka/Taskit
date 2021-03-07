const express = require('express');

function routes(UserProfile) {
  const router = express.Router();
  router.route('/')
    .post((req, res) => {
      UserProfile.login(req.body, (err, token) => {
        if (err) {
          console.log(err);
          return res.sendStatus(401);
        }
        //TODO https?
        res.cookie("jwt", token, {secure: false, httpOnly: false});
        return res.send();
      });
    });

  return router;
}

module.exports = routes;
