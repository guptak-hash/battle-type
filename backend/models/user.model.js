const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    maxlength: [50, 'Name cannot exceed 50 characters'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    minlength: [6, 'Password must be at least 6 characters'],
    required: function() { return !this.githubId }
    // select: false // Never return password in queries
  },
  avatar: {
    public_id: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: 'https://example.com/default-avatar.jpg'
    }
  },
  role: {
    type: String,
    enum: ['user', 'admin','premium'],
    default: 'user'
  },
   githubId: {
    type: String,
    unique: true,
    sparse: true // Allows null values without violating unique constraint
  },
   provider: {
    type: String,
    enum: ['local', 'github'],
    default: 'local'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
});

const UserModel=mongoose.model('user',userSchema)

module.exports = UserModel