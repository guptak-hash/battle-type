const UserModel = require("../models/user.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const addUser = async (req, res) => {
    try {
        const user = await UserModel.create(req.body);
        res.status(200).json({ msg: 'User signup success', user })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ msg: 'Something went wrong' })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`email>>${email} || password>>${password}`)
        // check if user exits;
        // finOne() will return Object, find() will return array of objects
        const user = await UserModel.findOne({ email });
        console.log('user >> ',user)
        if (!user) return res.status(400).json({ msg: "User doesn't exist. Please sign up" });
        // compare password with hash password
        const match = await bcrypt.compare(password, user.password);
        // console.log(`match >> ${match}`)
        // if not matched return
        if (!match) return res.status(400).json({ msg: "Wrong password" });
        // generate jwt access token valid for 15 minutes
        const accessToken = jwt.sign({ userId: user._id,role:user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" }); // token valid for  secs
        await user.save();
        res.status(200).json({ msg: 'User login success', accessToken: accessToken })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: 'Something went wrong' })
    }
}

const getProfile = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ msg: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await UserModel.findById(decoded.userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (err) {
        console.log(err.message);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ msg: 'Invalid token' });
        }
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

module.exports = { addUser, loginUser, getProfile }