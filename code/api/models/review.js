const sql = require('../db.js');
const Task = require('./task.js');

const Review = function(user) {
    this.id = user.id;
    this.rating = user.rating;
    this.description = user.description;
    this.taskID = user.taskID;
}

/*
    Review.get will return all reviews if no query params is passed
        If the URL contains valid query params (i.e. id and/or taskID), the db
        will either return id or taskID or if both are present and return the review
        that has both values

        Possible outcomes:
            // No params is present (/review)
                SELECT * from review;

            // id param is present (/review?id=...)
                SELECT * from review WHERE id = ${queryParams['id']};

            // taskID param is present (/review?taskID=...)
                SELECT * from review WHERE taskID = ${queryParams['taskID']};

            // Both id and taskID is present (/review?id=...&taskID=...)
                SELECT * from review WHERE id = ${queryParams['id']} AND taskID = ${queryParams['taskID']};
*/
Review.get = (req, result) => {
    console.log("[Review.js] - Get Request");
    var queryParams = req.query; // Store params as json

    var queryLen = Object.keys(queryParams).length;
    if (queryLen == 0) {
        // If there's no query params return all reviews
        console.log("[/models/Review.js]", queryLen, "param passed");
        sql.executeQuery('SELECT * from review', (err, res) => {
            if (err) { result(err, null); }
            if (res) { result(null, res['rows']); }
            return;
        });
    } else {
        // If query params exists process information
        console.log("[/models/Review.js]", queryLen, "param passed");

        var validParam = ['id', 'taskID'];
        var queryStr = 'SELECT * from review WHERE';
        var paramKeys = Object.keys(queryParams);
        var first = true;
        for (const i in validParam) {
            if(paramKeys.includes(validParam[i])) {
                queryStr += first ? '' : 'AND'; 
                queryStr += ` ${validParam[i]} = ${queryParams[validParam[i]]} `;
                first = false;
            }
        }
        console.log(queryStr);

        sql.executeQuery(queryStr, (err, res) => {
            if (err) { console.log(err); result(err, null); }
            if (res) { result(null, res['rows']); }
            return;
        })
    }
};

/*
    Expected JSON format for newReview.body:
    {
        review: {
            rating: ...,
            description: ...,
            taskID: taskID must be present otherwise abort
        }
    }
*/
Review.create = (newReview, result) => {
    console.log("[Review.js] - Post Request");
    console.log(newReview.body);
    var rating = newReview.body.review.rating;
    var description = newReview.body.review.description;
    var taskID = newReview.body.review.taskID;

    if (taskID == null) { 
        // result('[ABORT REVIEW] taskID is NULL', null); // UNCOMMENT ONCE TASKID IS IMPLEMENTED
        taskID = 1;
    }
    var query_insert_review = "INSERT INTO review(`rating`, `description`, `taskID`)" +
                            ` VALUES(${rating}, '${description}', ${taskID});`;

    sql.executeQuery(query_insert_review, (err, res) => {
        if (err) { console.log(err); result(err, null); }
        return;
    });
    
    var insertReview = { rating: rating, description: description, taskID: taskID };
    console.log('Review has successfully been create', insertReview);

    result(null, insertReview);
    return;
};

module.exports = Review;
