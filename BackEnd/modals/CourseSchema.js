const mongoose = require('mongoose');
const connection = require('../config/database');

const CourseSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  summary: String,
  price: Number,
  subject: String,
  instructor: { id: String, name: String },
  rating: Number,







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

const Course = connection.model('CourseSchema', CourseSchema);


module.exports = Course;