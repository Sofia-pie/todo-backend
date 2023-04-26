const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
  user_id: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  title: {
    type: String,
    required: true,
  },
  due_date: { type: Date },
  completed: { type: Boolean, default: false },
  description: { type: String },
  priority: {
    type: Number,
  },
  tags: {
    type: [String],
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = {
  Task,
};
