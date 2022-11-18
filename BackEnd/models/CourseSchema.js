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
  discountPrice: {
    type: Number,
    required: true
  },
  discount: {
    discount: Number,
    default: 0,
    startDate: Date,
    duration: Number,
    endDate: Date,
    //expiration: moment().add(, "days").valueOf()
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
    required: true
  },
  instructorName: {
    type: String,
    required: true
  },
  instructorID: {
    type: mongoose.Types.ObjectId,
    ref: 'UserSchema'
  },
  //linking users to exercises && rating
  courseHours: {
    type: Number,
    required: true
  },
  // exercises: [{
  //   title: String,
  //   questions: [{
  //     question: String,
  //     choices: [String],
  //     answer: Number,
  //     isVisible: Boolean,
  //   }],
  //   totalGrade: Number
  // }],
  subtitles: [{
    header: String,
    contents: [{
      contentTitle: String,
      video: String,
      preview: Boolean,
      duration: Number,
      description: String,
    }],
    exercise: {
      exerciseTitle: String,
      questions: [{
        question: String,
        choices: [String],
        answer: String,
        isVisible: Boolean,
      }],
      totalGrade: Number
    },
    totalMinutes: Number,
  }],
  finalExam: {
    questions: [{
      question: String,
      choices: [String],
      answer: String,
      isVisible: Boolean,
    }],
    finalGrade: Number,
  },
  rating: {
    one: Number,
    two: Number,
    three: Number,
    four: Number,
    five: Number,
    avg: {
      type: Number,
      default: 0
    }
    //   set: function() {
    //   return (this.one +(this.two *2) + (this.three*3)+(this.four*4)+(this.five*5))
    //   / (this.one + this.two + this.three + this.four + this.five)
    // }
  },
  review:[{
    username:String,
    reviewBody:String,
    rating:Number
  }]


});





const Course = connection.model('Course', CourseSchema);


module.exports = Course;