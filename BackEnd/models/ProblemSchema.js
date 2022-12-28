const mongoose = require('mongoose');
const connection = require('../config/database');

const ProblemSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Technical', 'Financial', 'Other'],
    },
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'UserSchema'
    },
    username:{
        type:String
    },
    status:{
        type:String,
        enum:['unseen','resolved','pending'],
        default:'unseen'
    },
    body: {
        type: String
    },
    courseID: {
        type: mongoose.Types.ObjectId,
        ref: 'CourseSchema'
    },
    courseTitle:{
        type:String
    },
    startDate:{
        type:Date
    },
    courseTitle: {
        type: String
    },
    comment: [{
        type: String
    }],

})

const Problem = connection.model('Problem', ProblemSchema);

module.exports = Problem;