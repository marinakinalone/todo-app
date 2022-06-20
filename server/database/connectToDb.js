const mongoose = require('mongoose');
require('dotenv').config();

const callback = (error) => {
  if (error) {
    throw new Error(`error connecting to database: ${error.message}`);
  } else {
    // eslint-disable-next-line no-console
    console.log('connected to database');
  }
};

const connectToDb = (uri = process.env.MONGO_URI) => mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, callback);

module.exports = connectToDb;
