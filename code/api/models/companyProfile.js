const sql = require("../db.js");

const CompanyProfile = function(user) {
    this.userID = user.id;
};

CompanyProfile.taskNreview = (req, result) => {
    var workerID = req.params.workerID;
    var query = `SELECT userProfile.name as "reviewerName", task.id as "taskID", task.typeID, task.title as "taskTitle", task.description as "taskDesc", task.price as "taskPrice", task.datePosted, task.dateCompleted, review.id as "reviewID", review.rating as "reviewRating", review.description as "reviewDesc"
                    FROM task
                    JOIN statusTask ON task.statusID = statusTask.id
                    JOIN review ON review.taskID = task.id
                    JOIN userProfile ON userProfile.id = task.taskerID
                    WHERE task.workerID = ${workerID} AND statusID = 5;`;
    sql.executeQuery(query, (err, res) => {
        if (err) { console.log(err); result(err, null); }
        if (res) { result(null, res['rows']); }
        return;
    });
};

module.exports = CompanyProfile;