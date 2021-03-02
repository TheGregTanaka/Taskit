const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const db = require('./db.js');

const port = process.env.PORT || 3200;
const UserModel = require('./models/userProfile');
const userRouter = require('./routes/userProfile')(UserModel);
const TaskModel = require('./models/task');
const taskRouter = require('./routes/task')(TaskModel);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/userProfile', userRouter);
app.use('/task', taskRouter);
app.get('/', (req, res) => {
  res.send('Welcome to the Taskit Rest API');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
