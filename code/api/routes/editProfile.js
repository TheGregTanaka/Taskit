const express = require('express');

function routes(UserProfile) {
    const router = express.Router();
    router.route('/')

        .post((req, res) => {
            UserProfile.update(req.body.id, req.body, (err, token, body) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(401);         
                }
                console.log(req.body.id);
                console.log(req.body);
                res.cookie("jwt", token, {secure: false, httpOnly: false});
                return res.send(body);
            });
        });

    return router;
}


  

module.exports = routes;