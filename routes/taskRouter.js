const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

// Middleware to protect routes with auth
router.use(authMiddleware);

// Routes for tasks
router.get('/', getAllTasks);
router.post('/', createTask);
router.get('/:id', getTaskById);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = {
  taskRouter: router,
};
