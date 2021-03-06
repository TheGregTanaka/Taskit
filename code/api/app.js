const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const db = require('./db.js');
const port = process.env.PORT || 3200;

const UserModel = require('./models/userProfile');
const TaskModel = require('./models/task');

const userRouter = require('./routes/userProfile')(UserModel);
const taskRouter = require('./routes/task')(TaskModel);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/task', taskRouter);
app.get('/', (req, res) => {
  var s = 'Welcome to the Taskit API. ' +
    '<a href="https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/blob/main/code/api/README.md">' +
    'Click here to read the documentation.</a>';
  res.send(s);
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
