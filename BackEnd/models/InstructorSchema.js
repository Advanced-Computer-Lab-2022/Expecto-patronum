const mongoose = require('mongoose');
const connection = require('../config/database');

const InstructorSchema = new mongoose.Schema({
  userID:
  {
    type: String,
    required: true,
    unique: true
  },
  firstname:
  {
    type: String,
    required: true,
  },
  lastname:
  {
    type: String,
    required: true,
  }
});

const Instructor = connection.model('Instructor', InstructorSchema);


module.exports = Instructor;