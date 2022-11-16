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
  },
  instructorRating:{
    one: Number,
    two: Number,
    three: Number,
    four: Number,
    five: Number,
    avg: {
      type: Number,
      default: 0
    }
  },

  instructorReview:[{
    username:String,
    reviewBody:String,
    rating:Number
  }],
  purchasedCourses:[{
    courseID:{
    type: mongoose.Types.ObjectId,
    ref: 'CourseSchema'
    },
    grade:Number,
    progress:Number,
    exerciseAnswers:[String]

}],

  biography:{
    type:String
  }

});

const User = connection.model('User', UserSchema);

module.exports = User;