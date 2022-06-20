const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const listsRoute = require('./routes/listsRoute');
// const tasksRoute = require('./routes/tasksRoute');
const connectToDb = require('./database/connectToDb');
require('dotenv').config();

connectToDb();
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// app.use('/lists', listsRoute);
// app.use('/tasks', tasksRoute);

module.exports = app;
