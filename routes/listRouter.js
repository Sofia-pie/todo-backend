const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middleware/auth');
const {
  getLists,
  createList,
  deleteList,
  getListById,
} = require('../controllers/listConroller');

const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getLists);
router.post('/', authMiddleware, createList);
router.get('/:id', authMiddleware, getListById);
router.delete('/:id', authMiddleware, deleteList);

module.exports = {
  listRouter: router,
};
