const mongoose = require('mongoose');
const connection = require('../config/database');

const AdminSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true
  },
});




const Admin = connection.model('Admin', AdminSchema);


module.exports = Admin;