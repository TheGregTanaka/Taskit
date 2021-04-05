const express = require('express');

function routes(Review) {
  const router = express.Router();

  router.route('/:workerID')
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
  router.route('/getAvgRating/:workerID')
    .get((req, res) => {
      Review.getAvgRating(req, (err, avgRating) => {
        if (err) { return res.send(err).status(404); }
        if (avgRating) { return res.json(avgRating).status(200); }
      })
    })
  return router;
}

module.exports = routes;