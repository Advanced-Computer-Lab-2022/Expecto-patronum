const { json } = require('express');
const mongoose = require('mongoose');
const connection = require('../config/database');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
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
  skills: {
    type: String
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'AllLevels'],
    default: 'AllLevels',
    required:true
  },
  instructorName: {
    type: String,
    required: true
  },  
  instructorID: {
      type: mongoose.Types.ObjectId,
      ref:'UserSchema'
  },
  //linking users to exercises && rating
  courseHours: {
    type: Number,
    required: true
  },
  subtitles:[ {
    header: String,
    contents:[{
      title: String,
      video:String,
      preview:Boolean,
      duration:Number,
      description: String
    }],
    totalMinutes: Number,
  }], 
  exercises:[{title:String,
    questions:[{
      question: String,
      choices:[String],
      answer:Number,
      isVisible:Boolean,
     }],
    totalGrade:Number}]
      ,
  rating: {
    one: Number,
    two: Number,
    three: Number,
    four: Number,
    five: Number,
    avg:{ type: Number,
      default: 0
  }
    //   set: function() {
    //   return (this.one +(this.two *2) + (this.three*3)+(this.four*4)+(this.five*5))
    //   / (this.one + this.two + this.three + this.four + this.five)
    // }
  },
});

const Course = connection.model('Course', CourseSchema);


module.exports = Course;