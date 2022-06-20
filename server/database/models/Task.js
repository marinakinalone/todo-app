const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    name: String,
    listName: String,
    done: Boolean,
    type: String,
    related: String,
  },
  {
    collection: 'tasks',
  },
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
