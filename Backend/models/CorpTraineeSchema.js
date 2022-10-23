const mongoose = require('mongoose');
const connection = require('../config/database');

const CorpSchema = new mongoose.Schema({
  username: {
    type: String,
    required:true,
    unique:true
   },
   email:{
     type: String,
     required:true,
     unique:true 
   },
   hash:{
     type: String,
     required:true,
   } ,
   salt:{
     type: String,
     required:true,
   } ,
   firstName:{
     type: String,
     required:true,
   } ,
   lastName: {
     type: String,
     required:true,
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

const CorpTrainee = connection.model('CorporateTrainee', CorpSchema);


module.exports = CorpTrainee;