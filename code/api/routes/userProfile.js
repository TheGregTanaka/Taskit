const express = require('express');
const {authenticate} = require('../middleware');

function routes(UserProfile) {
  const router = express.Router();
  router.route('/')
    .post((req, res) => {
      UserProfile.create(req.body, (err, msg) => {
        if (err) {console.log(err);}
        return res.json(msg);
      });
    });

  router.route('/:id')
    .get((req, res) => {
      UserProfile.getOne(req.params.id, (err, userProfile) => {
        if(err) {
          return res.send(err);
        }
        if (userProfile) {
          return res.json(userProfile);
        }
        return res.sendStatus(404);
      });
    })
    .patch(authenticate, (req, res) => {
      UserProfile.update(req.params.id, req.body, (err, r) => {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        //todo proper response
        return res.sendStatus(204);
      })
    })
    .delete(authenticate, (req, res) => {
      UserProfile.delete(req.params.id, (err, r) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });
  return router;
}

module.exports = routes;
