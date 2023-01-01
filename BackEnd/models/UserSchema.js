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
  gender: {
    type: String,
    enum: ['Male', 'Female'],
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

  instructorRating: {
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

  instructorReview: [{
    username: String,
    reviewBody: String,
    rating: Number
  }],
  purchasedCourses: [{
    courseID: {
      type: mongoose.Types.ObjectId,
      ref: 'CourseSchema'
    },
    excercises: [{
      excerciseID: {
        type: mongoose.Types.ObjectId,
        ref: 'ExcerciseSchema'
      },
      grade: Number,
      exercisesAnswers: {
        exerciseTitle: String,
        answer: [String],
      },

    }],
    progress: {
      type: Number,
      default: 0
    },
    courseRating: {
      type: Number,
      default: 0
    },
    courseReview: String,
    instructorRating: {
      type: Number,
      default: 0
    },
    instructorReview: String,
    watchedMinutes: {
      type: Number,
      default: 0
    },
    lastWatched: {
      type: String,
      default: "Null"
    },
    watchedVideos: [String],
    notes: [{
      subtitleName: String,
      contentName: String,
      subtitleIndex: Number,
      contentIndex: Number,
      contentID: String,
      subtitleID: String,
      timestamp: String,
      note: String
    }]
  }],

  biography: {
    type: String
  },
  wallet: {
    type: Number,
    default: 0
  },
  paymentMethods: [{
    last4: Number,
    expiration: String,
    name: String,
    customerId: String,
    cardType: String
  }]

});

const User = connection.model('User', UserSchema);

module.exports = User;