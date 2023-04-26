const { Task } = require('../models/Task');

// get all user's tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user_id: req.user._id });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tasks for a specific list
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      list_id: req.params.list_id,
      user_id: req.user._id,
    });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, user_id: req.params.user_id });
    await task.save();
    res.status(201).json({ task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user_id: req.params.user_id,
    });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTasks,
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
