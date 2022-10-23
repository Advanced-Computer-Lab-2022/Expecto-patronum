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
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  Role: {
    type: String,
    enum: ['User', 'Admin', 'instructer', 'CorpTrainee'],
    default: 'User'
  }
});

/* 
*/

const User = connection.model('User', UserSchema);


module.exports = User;