const mongoose = require('mongoose');
const connection = require('../config/database');

const ProblemSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['technical', 'financial','other'],
    },
    userID:{
        type: mongoose.Types.ObjectId,
        ref:'UserSchema'
    },
    status:{
        type:String,
        enum:['unseen','resolved','pending'],
        default:'unseen'
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
    },

    comment:[{
        type:string
    }],
      
})

const Problem = connection.model('Problem', ProblemSchema);

module.exports = Problem;