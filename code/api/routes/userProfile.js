const express = require('express');

function routes(UserProfile) {
  const router = express.Router();
  router.route('/')
    .post((req, res) => {
      UserProfile.create(req.body, (err, msg) => {
        if (err) {console.log(err);}
        return res.json(msg);
      });
    });

  router.route('/:userProfileID')
    .get((req, res) => {
      console.log(req.params.userProfileID);
      UserProfile.getOne(req.params.userProfileID, (err, userProfile) => {
        if(err) {
          return res.send(err);
        }
        if (userProfile) {
          return res.json(userProfile);
        }
        return res.sendStatus(404);
      });
    })
    //.put(UserProfile.update)
    .patch((req, res) => {
      UserProfile.update(req.body, (err, res) => {})
    })
    .delete((req, res) => {
      req.userProfile.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });


  return router;
}

module.exports = routes;
