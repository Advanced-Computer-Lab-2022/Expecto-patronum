const { json } = require('express');
const mongoose = require('mongoose');
const connection = require('../config/database');

const ExcerciseSchema= new mongoose.Schema({
  courseID: {
    type: mongoose.Types.ObjectId,
    ref:'CourseSchema',
    unique: true
  },
   
    exerciseTitle:{
        type:String,
        required:true
    },
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