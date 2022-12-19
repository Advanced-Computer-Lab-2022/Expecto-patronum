const mongoose = require('mongoose');
const connection = require('../config/database');

const TransactionSchema = new mongoose.Schema({
    userID:{
        type: mongoose.Types.ObjectId,
        ref:'UserSchema'
    },
    courseID: {
        type: mongoose.Types.ObjectId,
        ref:'CourseSchema'
    },
    transactionDate:{
        type:Date
    },
    transactionAmount:{
        type:Number
    }

})

const Transaction = connection.model('Transaction', TransactionSchema);

module.exports = Transaction;