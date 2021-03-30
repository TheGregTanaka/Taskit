const express = require("express");

function routes(Task) {
  const router = express.Router();
  router
    .route("/")
    .get((req, res) => {
      Task.get(req, (err, task) => {
        if (err) {
          return res.send(err);
        }
        if (task) {
          return res.json(task);
        }
        return res.sendStatus(404);
      });
    })
    .post((req, res) => {
      Task.create(req.body, (err, msg) => {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        return res.json(msg);
      });
    });

  router.route("/getFeed").get((req, res) => {
    Task.getFeed(req, (err, task) => {
      if (err) {
        return res.send(err);
      }
      if (task) {
        return res.json(task);
      }
      return res.sendStatus(404);
    });
  });

  router
    .route("/:taskID")
    .get((req, res) => {
      Task.getOne(req.params.taskID, (err, task) => {
        if (err) {
          return res.send(err);
        }
        if (task) {
          return res.json(task);
        }
        return res.sendStatus(404);
      });
    })
    .put(Task.update)
    .patch((req, res) => {
      const { task } = req;

      /*if (req.body._id) {
        delete req.body._id;
      }
      */
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        task[key] = value;
      });
      req.task.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(task);
      });
    })
    .delete((req, res) => {
      req.task.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });
  return router;
}

module.exports = routes;
