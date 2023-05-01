const { List } = require('../models/List');
const { Task } = require('../models/Task');

const getLists = async (req, res) => {
  try {
    const lists = await List.find({ user_id: req.user._id }).populate('tasks');
    res.json(lists);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const getListById = async (req, res) => {
  try {
    const list = await List.findOne({
      _id: req.params.id,
      user_id: req.user._id,
    }).populate('tasks');

    if (!list) {
      return res.status(404).json({ msg: 'List not found' });
    }

    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const createList = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newList = new List({
      title,
      description,
      user_id: req.user._id,
    });

    await newList.save();
    res.json(newList);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const deleteList = async (req, res) => {
  try {
    const list = await List.findOne({
      _id: req.params.id,
      user_id: req.user._id,
    });

    if (!list) {
      return res.status(404).json({ msg: 'List not found' });
    }

    await Task.deleteMany({ list_id: list._id });
    await List.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user._id,
    });

    res.json({ msg: 'List and tasks deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = { getLists, createList, deleteList, getListById };
