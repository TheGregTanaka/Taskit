require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//const jwt = require('jsonwebtoken');

const cors = require('cors');
const app = express();
const db = require('./db.js');
const port = process.env.PORT || 3200;


const CompanyProfileModel = require('./models/companyProfile');
// const PaymentModel = require('./models/payment');
const ReviewModel = require('./models/review');
const TaskModel = require('./models/task');
const TypeModel = require('./models/type');
const UserModel = require('./models/userProfile');


const companyProfileRouter = require('./routes/companyProfile')(CompanyProfileModel);
const login = require('./routes/login')(UserModel);
// const paymentRouter = require('./routes/payment')(PaymentModel);
const paymentRouter = require('./routes/payment');
const reviewRouter = require('./routes/review')(ReviewModel);
const taskRouter = require('./routes/task')(TaskModel);
const typeRouter = require('./routes/type')(TypeModel);
const userRouter = require('./routes/userProfile')(UserModel);
const registrantion = require('./routes/registration')(UserModel);
const profileRouter = require('./routes/editProfile')(UserModel);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors());
app.use(express.static('public'));
app.use(cookieParser());

app.use('/companyProfile', companyProfileRouter);
app.use('/login', login);
app.use('/payment', paymentRouter);
app.use('/review', reviewRouter);
app.use('/task', taskRouter);
app.use('/type', typeRouter);
app.use('/user', userRouter);
app.use('/registration', registrantion);
app.use('/editProfile', profileRouter);


app.get('/', (req, res) => {
  var s = 'Welcome to the Taskit API. ' +
    '<a href="https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/blob/main/code/api/README.md">' +
    'Click here to read the documentation.</a><br>' + 
    '<a href="https://taskit-frontend.herokuapp.com/">Click here to visit the app</a>';
  res.send(s);
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

