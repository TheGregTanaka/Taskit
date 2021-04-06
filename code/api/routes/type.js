const express = require('express');

function routes(Type) {
  const router = express.Router();

  router.route('/:typeID')
    .get((req, res) => {
      Type.get(req, (err, review) => {
        if (err) { return res.send(err).status(404); }
        if (review) { return res.json(review).status(200); }
      });
    });

  return router;
}

module.exports = routes;