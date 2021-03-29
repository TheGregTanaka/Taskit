const express = require('express');

function routes(Registration) {
    const router = express.Router();
    router.route('/')
    module.exports = routes;
    router.post('/home/pick_color', function(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        var name = req.body.name;
        var insert_statement = // Write a SQL statement to insert a color into the favorite_colors table

        db.task('get-everything', task => {
              return task.batch([
                  task.any(insert_statement)
              ]);
          })
          .then(info => {
            res.render('src/components/Registration',{
              my_title: "Registration",
              data: // Return the color choices
              email: // Return the hex value of the color added to the table
              color_msg: // Return the color message of the color added to the table
            })
          })
          .catch(err => {
                  console.log('error', err);
                  res.render('src/components/Registration', {
                      my_title: 'Registration',
                      data: '',
                      color: '',
                      color_msg: ''
                  })
          });
      });
        
      .post((req, res) => {
        Registration.registration(req.body, (err, token) => {
          if (err) {
            console.log(err);
            return res.sendStatus(401);
          }
          //TODO https?
          res.cookie("jwt", token, {secure: false, httpOnly: false});
          return res.send();
        });
      });
  
    return router;
  }

module.exports = routes;
