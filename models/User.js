const mongoose = require('mongoose');

const { Schema } = mongoose;

const userchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const User = mongoose.model('User', userchema);

module.exports = {
  User,
};
