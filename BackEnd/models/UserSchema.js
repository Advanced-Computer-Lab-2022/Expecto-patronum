const mongoose = require('mongoose');
const connection = require('../config/database');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['User', 'Admin', 'Instructor', 'CorporateTrainee'],
    default: 'User'
  }
});

const User = connection.model('User', UserSchema);

module.exports = User;