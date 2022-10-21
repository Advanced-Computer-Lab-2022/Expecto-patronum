const mongoose = require('mongoose');
const connection = require('../config/database');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  hash: String,
  salt: String,
  firstName: String,
  lastName: String,
});

/* 
*/

const User = connection.model('User', UserSchema);


module.exports = User;