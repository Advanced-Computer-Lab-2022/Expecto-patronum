const { json } = require('express');
const mongoose = require('mongoose');
const connection = require('../config/database');

const ExcerciseSchema = new mongoose.Schema({
  courseID: {
    type: mongoose.Types.ObjectId,
    ref: 'CourseSchema'
  },

  subtitleName: {
    type: String,
  },
  exerciseDuration: Number,

  exerciseTitle: {
    type: String,
    required: true
  },
  averageMark: [Number],
  questions:
    [{
      problem: String,
      choices: [String],
      answer: String,
    }],

  totalGrade: Number
},
);




const Excercise = connection.model('Excercise', ExcerciseSchema);


module.exports = Excercise;