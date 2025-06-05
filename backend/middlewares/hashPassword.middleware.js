const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');
const saltRounds = 10;



const hashPassword = async (req, res, next) => {
    try {
        const { password, email } = req.body;
        // checking if user already exists
        const user = await UserModel.find({ email });
        // console.log('checking if user already exists > ',user)
        if (user.length) return res.status(400).json({ msg: 'User already exists. Please login' })
        // then hashing password
        const hash = await bcrypt.hash(password, saltRounds);
        req.body.password = hash;
        next();
    } catch (err) {
        console.error("Hashing error:", err);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}


module.exports = hashPassword;