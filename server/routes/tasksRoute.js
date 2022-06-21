const express = require('express');
const {
  getTasksFromList, getOneTask, createTask, updateTask, deleteTask,
} = require('../controllers/task');

const router = express.Router();

router.get('/:list/all', getTasksFromList);
router.get('/:list/:name', getOneTask);
router.post('/:list/create', createTask);
router.put('/:list/:name', updateTask);
router.delete('/:list/:name', deleteTask);

module.exports = router;
