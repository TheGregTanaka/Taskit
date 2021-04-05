const express = require('express');

function routes(Review) {
  const router = express.Router();

  router.route('/')
    .get((req, res) => {
      return res.send("good")
    });

  return router;
}

module.exports = routes;