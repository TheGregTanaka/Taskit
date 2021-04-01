require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//const jwt = require('jsonwebtoken');

const cors = require('cors');
const app = express();
const db = require('./db.js');
const port = process.env.PORT || 3200;

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
server.listen(80);

// app.use('/static', express.static('node_modules'));
// Handle connection
io.on('connection', function (socket) {
  console.log("Connected succesfully to the socket ...");

  var news = [
      { title: 'The cure of the Sadness is to play Videogames',date:'04.10.2016'},
      { title: 'Batman saves Racoon City, the Joker is infected once again',date:'05.10.2016'},
      { title: "Deadpool doesn't want to do a third part of the franchise",date:'05.10.2016'},
      { title: 'Quicksilver demand Warner Bros. due to plagiarism with Speedy Gonzales',date:'04.10.2016'},
  ];

  // Send news on the socket
  socket.emit('news', news);

  socket.on('my other event', function (data) {
      console.log(data);
  });
});


const ReviewModel = require('./models/review');
const TaskModel = require('./models/task');
const UserModel = require('./models/userProfile');

const chatRouter = require('./routes/chat');
const login = require('./routes/login')(UserModel);
const reviewRouter = require('./routes/review')(ReviewModel);
const taskRouter = require('./routes/task')(TaskModel);
const userRouter = require('./routes/userProfile')(UserModel);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors());


app.use('/login', login);
app.use('/review', reviewRouter);
app.use('/task', taskRouter);
app.use('/user', userRouter);

// // --
// const chatPort = process.env.PORT || 4001;
// const http = require('http');
// const socketIo = require("socket.io");
// const server = http.createServer(app);
// const io = socketIo(server);

// let interval;

// io.on("connection", (socket) => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 1000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// });

// const getApiAndEmit = socket => {
//   const response = new Date();
//   // Emitting a new message. Will be consumed by the client
//   socket.emit("FromAPI", response);
// };

// server.listen(chatPort, () => console.log(`Listening on port ${chatPort}`));
// // --

app.get('/', (req, res) => {
  var s = 'Welcome to the Taskit API. ' +
    '<a href="https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/blob/main/code/api/README.md">' +
    'Click here to read the documentation.</a>';
  res.send(s);
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
