const express = require('express');
const { getUserInfo } = require('../controllers/userController');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/:id', authMiddleware, getUserInfo);

module.exports = {
  userRouter: router,
};
