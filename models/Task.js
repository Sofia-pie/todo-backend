const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
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
  list_id: { type: Schema.Types.ObjectId, ref: 'List' },
  important: { type: Boolean, default: false },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = {
  Task,
};
