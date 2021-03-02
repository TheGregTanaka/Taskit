const express = require('express');

function routes(UserProfile) {
  const router = express.Router();
  router.route('/')
    .post(UserProfile.create);
  //  .get(UserProfile.get);

  /*
  router.use('/:userProfileID', (req, res, next) => {
    console.log("Found use");
    console.log(req.params.userProfileID);
    UserProfile.getOne(req.params.userProfileID, (err, userProfile) => {
      if(err) {
        console.log(err);
        return res.send(err);
      }
      if (userProfile) {
        console.log("AAA");
        console.log(userProfile);
        req.body = userProfile;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  */
  router.route('/:userProfileID')
    .get((req, res) => {
        console.log("Found use");
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
    .put(UserProfile.update)
    .patch((req, res) => {
      const { userProfile } = req;

      /*if (req.body._id) {
        delete req.body._id;
      }
      */
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        userProfile[key] = value;
      });
      req.userProfile.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(userProfile);
      });
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
