const sql = require('../db.js');

const Review = function(user) {
    this.id = user.id;
    this.rating = user.rating;
    this.description = user.description;
    this.taskID = user.taskID;
}

/*
    Review.get will retrieve reviews and userprofile infomation based on workerID
*/
Review.get = (req, result) => {
    var workerID = req.params.workerID;
    var query = `SELECT review.id, review.rating, review.description, userProfile.email, userProfile.name, userProfile.profilePicture
                    FROM review
                    JOIN task ON review.taskID = task.id
                    JOIN userProfile ON task.taskerID = userProfile.id
                    WHERE task.workerID = ${workerID}`;
    

    sql.executeQuery(query, (err, res) => {
        if (err) { console.log(err); result(err, null); }
        if (res) { result(null, res['rows']); }
        return;
    });
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

    var rating = newReview.body.review.rating;
    var description = newReview.body.review.description;
    var taskID = newReview.body.review.taskID;

    if (taskID == null) { 
        result('[ABORT REVIEW] taskID is NULL', null); // UNCOMMENT ONCE TASKID IS IMPLEMENTED
    }
    var query_insert_review = "INSERT INTO review(`rating`, `description`, `taskID`)" +
                            ` VALUES(${rating}, "${description}", ${taskID});`;

    sql.executeQuery(query_insert_review, (err, res) => {
        if (err) { console.log(err); result(err, null); }
        return;
    });
    
    var insertReview = { rating: rating, description: description, taskID: taskID };

    result(null, insertReview);
    return;
};

/*
    Review.getAvgRating will return the average rating from each task that the reviewers make
*/
Review.getAvgRating = (req, result) => {
    var workerID = req.params.workerID;
    var query = `SELECT AVG(review.rating) as "avgRating"
                    FROM review
                    JOIN task ON review.taskID = task.id
                    JOIN userProfile ON task.workerID = userProfile.id
                    WHERE task.workerID = ${workerID};`;
    sql.executeQuery(query, (err, res) => {
        if (err) { console.log(err); result(err, null); }
        if (res) { result(null, res['rows']); }
        return;
    });

};
module.exports = Review;
