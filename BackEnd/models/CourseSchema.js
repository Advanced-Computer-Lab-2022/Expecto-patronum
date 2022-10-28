const mongoose = require('mongoose');
const connection = require('../config/database');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  subtitle: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  instructorID: {
    type: String,
    required: true
  },
  instructorName: {
    type: String,
    required: true
  },
});





const Course = connection.model('Course', CourseSchema);


module.exports = Course;