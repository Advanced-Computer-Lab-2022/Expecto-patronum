const mongoose = require('mongoose');
const connection = require('../config/database');

const instSchema = new mongoose.Schema({
  username: String,
  email: String,
  hash: String,
  salt: String,

  firstName: String,
  lastName: String,





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

const instructer = connection.model('instSchema', instSchema);


module.exports = instructer;