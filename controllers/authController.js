const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User.js');

const token = process.env.TOKEN_KEY;

const registerUser = async (req, res, next) => {
  const { email, password, name } = req.body;

  await saveUser({ email, password, name }).catch((err) => {
    next(err);
  });
  return await res.status(201).json({
    message: 'Profile created successfully',
  });
};

const loginUser = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (
    user &&
    (await bcryptjs.compare(String(req.body.password), String(user.password)))
  ) {
    const payload = {
      userId: user._id,
    };
    const jwtToken = jwt.sign(payload, token);
    return res.json({ jwt_token: jwtToken, _id: user._id });
  }
  return res.status(400).json({ message: 'Not authorized' });
};

module.exports = {
  registerUser,
  loginUser,
};

const saveUser = async ({ email, password, name, phone }) => {
  const user = new User({
    name,
    email,
    password: await bcryptjs.hash(password, 10),
    phone,
  });

  return await user.save();
};
