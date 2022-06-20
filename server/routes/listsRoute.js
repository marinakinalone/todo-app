const express = require('express');
const {
  getListsNames, getOneListName, createList, updateListName, deleteList,
} = require('../controllers/todoList');

const router = express.Router();

router.get('/all', getListsNames);
router.get('/:name', getOneListName);
router.post('/create', createList);
router.put('/:name', updateListName);
router.delete('/:name', deleteList);

module.exports = router;
