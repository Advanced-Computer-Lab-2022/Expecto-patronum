const mongoose = require('mongoose');
const connection = require('../config/database');

const RequestSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['refund', 'requestCourse'],
    },
    userID:{
        type: mongoose.Types.ObjectId,
        ref:'UserSchema'
    },
    status:{
        type:String,
        enum:['accepted','pending','rejected'],
        default:'pending'
    },
    body:{
        type:String
    },
    courseID:{
        courseID: {
            type: mongoose.Types.ObjectId,
            ref:'CourseSchema'
          }
    },
    startDate:{
        type:Date
    }

      

})

const Request = connection.model('Request', RequestSchema);

module.exports = Request;