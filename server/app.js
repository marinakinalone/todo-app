/* eslint-disable no-console */
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const Task = require('./database/models/Task');
const TodoList = require('./database/models/TodoList');
const listsRoute = require('./routes/listsRoute');
const tasksRoute = require('./routes/tasksRoute');
const connectToDb = require('./database/connectToDb');
require('dotenv').config();

connectToDb();
const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: true,
  origins: ['https://tout-doux-server.herokuapp.com'],
});

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

TodoList.watch().on('change', (change) => {
  console.log('some changes in the Todo List collection');
  io.emit('changes in todos', change.fullDocument);
});

Task.watch().on('change', (change) => {
  console.log('some changes in the Task collection');
  io.emit('changes in tasks', change.fullDocument);
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/lists', listsRoute);
app.use('/', tasksRoute);

module.exports = server;
