require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//const jwt = require('jsonwebtoken');

const cors = require('cors');
const app = express();
const db = require('./db.js');
const port = process.env.PORT || 3200;

const UserModel = require('./models/userProfile');
const TaskModel = require('./models/task');
const ReviewModel = require('./models/review');

const userRouter = require('./routes/userProfile')(UserModel);
const login = require('./routes/login')(UserModel);
const taskRouter = require('./routes/task')(TaskModel);
const reviewRouter = require('./routes/review')(ReviewModel);
// const reviewRouter = require('./routes/review');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors());


app.use('/user', userRouter);
app.use('/login', login);
app.use('/task', taskRouter);
app.use('/review', reviewRouter);
// app.use(reviewRouter);

app.get('/', (req, res) => {
  var s = 'Welcome to the Taskit API. ' +
    '<a href="https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/blob/main/code/api/README.md">' +
    'Click here to read the documentation.</a>';
  res.send(s);
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
