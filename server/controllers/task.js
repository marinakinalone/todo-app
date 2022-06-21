const { rawListeners } = require('../database/models/Task');
const Task = require('../database/models/Task');

const getTasksFromList = async (req, res) => {
  const data = await Task.find({ listName: req.params.list });
  res.json(data);
};

const getOneTask = async (req, res) => {
  const data = await Task.findOne({
    name: req.params.name,
    listName: req.params.list,
  });
  if (!data) {
    res.status(404).send('cannot find task');
    return;
  }
  res.json(data);
};

const createTask = async (req, res) => {
  if ((Object.keys(req.body).length) !== 5 && req.body.name === '') {
    res.status(400).send('cannot create task, make sure you added a name');
    return;
  }
  const data = await Task.create({
    name: req.body.name,
    listName: req.params.list,
    done: false,
    type: 'main',
    related: '',
  });
  res.json(data);
};

const updateTask = async (req, res) => {
  const data = await Task.findOneAndUpdate({
    name: req.params.name,
    listName: req.params.list,
  }, {
    name: req.body.name,
    listName: req.params.list,
    done: req.body.done,
    type: req.body.type,
    related: req.body.related,
  }, { new: true });
  if (!data) {
    res.status(404).send('cannot find task to update');
    return;
  }
  res.json(data);
};

const deleteTask = async (req, res) => {
  const data = await Task.deleteOne({
    name: req.params.name,
    listName: req.params.list,
  });
  if (data.deletedCount === 0) {
    res.status(404).send('cannot find task to delete');
    return;
  }
  res.json(data);
};

module.exports = {
  getTasksFromList, getOneTask, createTask, updateTask, deleteTask,
};
