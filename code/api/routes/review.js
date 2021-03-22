const express = require('express');

function routes(Review) {
  const router = express.Router();

  router.route('/')
    .get((req, res) => {
      Review.get(req, (err, review) => {
        if (err) { return res.send(err); }
        if (review) { return res.json(review); }
        return res.sendStatus(404);
      });
    })
    .post((req, res) => {
        // Review.create(req, (err, msg) => {
        //   if (err) {
        //     console.log(err);
        //     return res.send(err);
        //   }
        //   return res.json(msg);
        // });
    });
  return router;
}

module.exports = routes;