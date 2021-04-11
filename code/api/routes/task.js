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
      Task.update(req.params.taskID, req.body, (err, r) => {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    })
    .delete((req, res) => {
      Task.delete(req.params.taskID, (err, r) => {
        if (err) { return res.status(401).send(err); }
        return res.sendStatus(204);
      });
    });

  const userType = {
    TASKER: 0,
    WORKER: 1
  }
  router.route('/tasker/:id')
    .get((req, res) => {
      Task.byUser(userType.TASKER, req, (err, tasks) => {
        if (err) {
          return res.send(err);
        }
        if (tasks) {
          return res.json(tasks);
        }
        return res.sendStatus(404);
      });
    });
  router.route('/worker/:id')
    .get((req, res) => {
      Task.byUser(userType.WORKER, req, (err, tasks) => {
        if (err) {
          return res.send(err);
        }
        if (tasks) {
          return res.json(tasks);
        }
        return res.sendStatus(404);
      });
    });

  router.route('/worker/pending/:id')
    .get((req, res) => {
      Task.filterTaskStatus_worker(req, "Pending", (err, tasks) => {
        if (err) { return res.send(err).status(400); }
        if (tasks) { return res.json(tasks).status(200); }
      });
    });

  router.route('/worker/accepted/:id')
    .get((req, res) => {
      Task.filterTaskStatus_worker(req, "Accepted", (err, tasks) => {
        if (err) { return res.send(err).status(400); }
        if (tasks) { return res.json(tasks).status(200); }
      });
    });

  router.route('/worker/complete/:id')
    .get((req, res) => {
      Task.filterTaskStatus_worker(req, "Complete", (err, tasks) => {
        if (err) { return res.send(err).status(400); }
        if (tasks) { return res.json(tasks).status(200); }
      });
    });

  router.route('/tasker/pendingPayment/:id')
    .get((req, res) => {
      Task.getPendingPayment(req, (err, tasks) => {
        if (err) { return res.send(err).status(400); }
        if (tasks) { return res.json(tasks).status(200); }
      });
    });

  router.route('/tasker/confirm/:id')
    .get((req, res) => {
      Task.getRequiredConfirmation(req, (err, tasks) => {
        if (err) { return res.send(err).status(400); }
        if (tasks) { return res.json(tasks).status(200); }
      });
    });

  router.route('/drop/:id')
    .patch((req, res) => {
      Task.drop(req.params.id, req.body, (err, r) => {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });

    router.route('/deleteComplete/:taskID')
      .delete((req, res) => {
        Task.deleteComplete(req.params.taskID, (err, r) => {
          if (err) { return res.status(401).send(err); }
          return res.sendStatus(204);
        });
      });

  return router;
}

module.exports = routes;
