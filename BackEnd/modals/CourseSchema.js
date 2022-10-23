const mongoose = require('mongoose');
const connection = require('../config/database');

const CourseSchema = new mongoose.Schema({
  title:
  {
    type: String,
    required: true,
    unique: true
  },
  subtitle:
  {
    type: String,
    required: true
  },
  summary:
  {
    type: String,
    required: true
  },
  price:
  {
    type: Number,
    required: true
  },

  subject: {
    type: String,
    required: true
  },








  //courses 
  // refrence embeeded  , 
  /* 
  1)one to one prefeer embeeded ,
  2)one to few 50 100 prefer embeeded
  3)one to many prefeer refrence
  4)many to many refer
  
  */


  //  individ,corp,admin,instruct 

});

/* 
*/

const Course = connection.model('Course', CourseSchema);


module.exports = Course;