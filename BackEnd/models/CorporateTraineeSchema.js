const mongoose = require('mongoose');
const connection = require('../config/database');

const CorporateTraineeSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    ref:'UserSchema',
    unique: true
  },
});

const CorporateTrainee = connection.model('CorporateTrainee', CorporateTraineeSchema);

module.exports = CorporateTrainee;