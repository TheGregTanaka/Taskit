const sql = require("../db.js");

const Review = function(user) {
    // Worker to be reviewed
    this.workerID = user.workerID;
    this.taskID = user.taskID;

    // User Review
    this.userID = user.userID;
    this.name = user.name;
    this.rating = user.rating;
    this.img_src = user.img_src;
    this.description = user.description;
  };

Review.create = (new_review, results) => {
    console.log(new_review);
    var query_check_exisiting_review = "";
    sql.executeQuery(query_check_exisiting_review, 
        (err, res) => {
            if(err) { console.log(err); }
            



            // Insert user review
            var query_insert_review = "INSERT INTO "
            sql.executeQuery
        })
};