const express = require('express');

function routes(CompanyProfile) {
    const router = express.Router();
    router
        .route("/:workerID")
        .get((req, res) => {
            CompanyProfile.taskNreview(req, (err, results) => {
                if (err) { return res.send(err).status(400); }
                if (results) { return res.json(results).status(200); }
            });
        });
    return router;
}

module.exports = routes;