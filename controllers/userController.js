// getUserById = (req, res, next) => {
//   User.findById(req.params.id).exec((err, user) => {
//     if (err || !user) {
//       return res.status(400).json({
//         error: 'User not found',
//       });
//     }
//     req.profile = user;
//   });
// };

const { User } = require('../models/User');

getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

deleteUser = (req, res) => {
  const user = req.profile;
  user.remove((err, user) => {
    if (err) {
      return res.status(400).json({
        error: 'You are not authorized to perform this action',
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      message: 'User deleted successfully',
    });
  });
};

module.exports = {
  getUserInfo,
};
