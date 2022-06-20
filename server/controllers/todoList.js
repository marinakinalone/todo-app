const TodoList = require('../database/models/TodoList');

const getListsNames = async (req, res) => {
  const data = await TodoList.find({});
  res.json(data);
};

const getOneListName = async (req, res) => {
  const data = await TodoList.findOne({
    name: req.params.name,
  });
  if (!data) {
    res.status(404).send('cannot find todo list');
    return;
  }
  res.json(data);
};

const createList = async (req, res) => {
  if ((Object.keys(req.body).length) !== 1 && req.body.name === '') {
    res.status(400).send('cannot create todo list, make sure you added a name');
    return;
  }
  const data = await TodoList.create({
    name: req.body.name,
  });
  res.json(data);
};

const updateListName = async (req, res) => {
  const data = await TodoList.findOneAndUpdate({
    name: req.params.name,
  }, {
    name: req.body.name,
  }, { new: true });
  if (!data) {
    res.status(404).send('cannot find todo list name to update');
    return;
  }
  res.json(data);
};

const deleteList = async (req, res) => {
  const data = await TodoList.deleteOne({
    name: req.params.name,
  });
  if (data.deletedCount === 0) {
    res.status(404).send('cannot find todo list to delete');
    return;
  }
  res.json(data);
};

module.exports = {
  getListsNames, getOneListName, createList, updateListName, deleteList,
};
