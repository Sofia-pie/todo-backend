const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getTasks,
} = require('../controllers/taskController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', getAllTasks);

router.post('/', createTask);
router.get('/:id', getTaskById);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = {
  taskRouter: router,
};
