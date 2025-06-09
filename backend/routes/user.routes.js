const express = require('express');
const hashPassword = require('../middlewares/hashPassword.middleware');
const { addUser, loginUser, getProfile } = require('../controllers/user.controllers');
const UserRouter = express.Router();

// user signup
UserRouter.post('/signup', hashPassword, addUser);

// user login
UserRouter.post('/login', loginUser);

// get user profile
UserRouter.get('/profile', getProfile);

// get user profile
UserRouter.get('/profile', getProfile);

module.exports = UserRouter;