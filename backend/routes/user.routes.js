const express=require('express');
const hashPassword = require('../middlewares/hashPassword.middleware');
const { addUser, loginUser } = require('../controllers/user.controllers');
const passport=require('passport');
const GitHubStrategy=require('passport-github2');
const UserRouter=express.Router();

// user signup
UserRouter.post('/signup',hashPassword,addUser);

// user login
UserRouter.post('/login',loginUser);


module.exports=UserRouter;