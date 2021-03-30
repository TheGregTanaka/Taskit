const express = require('express');

function routes(Review) {
  const router = express.Router();

  router.route('/')
    .get((req, res) => {
      Review.get(req, (err, review) => {
        if (err) { return res.send(err).status(404); }
        if (review) { return res.json(review).status(200); }
      });
    })
    .post((req, res) => {
        Review.create(req, (err, msg) => {
          if (err) {
            console.log('[ERROR]', err);
            return res.send(err);
          }
          return res.json(msg);
        });
    });
  return router;
}

module.exports = routes;