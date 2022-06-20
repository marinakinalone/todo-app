const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoListSchema = new Schema(
  {
    name: String,
  },
  {
    collection: 'lists',
  },
);

const TodoList = mongoose.model('TodoList', todoListSchema);

module.exports = TodoList;
