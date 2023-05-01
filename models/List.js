const mongoose = require('mongoose');

const { Schema } = mongoose;

const listSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
});

const List = mongoose.model('List', listSchema);

module.exports = {
  List,
};
