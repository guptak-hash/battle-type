const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');
const saltRounds = 10;

const hashPassword = async (req, res, next) => {
    try {
        const { password, email } = req.body;
        
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ msg: 'Email and password are required' });
        }

        // checking if user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists. Please login' });
        }

        // then hashing password
        const hash = await bcrypt.hash(password, saltRounds);
        req.body.password = hash;
        next();
    } catch (err) {
        console.error("Hashing error:", err.message);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

module.exports = hashPassword;