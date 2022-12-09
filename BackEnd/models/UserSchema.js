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
  valid: {
    type: Boolean,
    default: false
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
  passwordTimeStamp: {
    type: Date, default: Date.now
  },
  emailTimeStamp: {
    type: Date, default: Date.now
  }

,

  instructorRating:{
    one: {
      type: Number,
      default: 0
    },
    two: {
      type: Number,
      default: 0
    },
    three: {
      type: Number,
      default: 0
    },
   four: {
      type: Number,
      default: 0
    },
    five: {
      type: Number,
      default: 0
    },
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
    excercises:[{
      excerciseID:{
      type: mongoose.Types.ObjectId,
      ref:'ExcerciseSchema'},
      grade:Number,
      exercisesAnswers:{
        exerciseTitle: String,
        answer: [String],
      },

    }],
    progress:Number,
    courseRating:{
      type :Number,
      default:0
    },
    courseReview:String,
    instructorRating:{
      type :Number,
      default:0
    },
    instructorReview:String,
    watchedMinutes: Number,
    watchedVideos:[String]
}],

  biography:{
    type:String
  },
  wallet:{
    type:Number
  },
  creditCard:{
    cardNumber:Number,
    expiryDate:Date,
    name:String,
    signature:String
  }

});

const User = connection.model('User', UserSchema);

module.exports = User;