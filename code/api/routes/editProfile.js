const express = require('express');

function routes(UserProfile) {
    const router = express.Router();
    router.route('/:id')
        .post((req, res) => {
          console.log(req.body);
            UserProfile.update(req.params.id, req.body, (err, body) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(401);         
                }
                return res.send(body);
            });
        });

    return router;
}

module.exports = routes;
