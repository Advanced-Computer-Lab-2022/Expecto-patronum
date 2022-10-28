const connection = require('../config/database');
const instructorTable = require('../models/InstructorSchema');
//const { isInstructor } = require('../middleware/RolesMiddleware');
const CourseTable = require('../models/CourseSchema');
const { query } = require('express');


async function viewCourses (req, res,next) {
    var CurrentPage = req.query.page? req.query.page:1;
    try {
      let queryCond = {};
      if (req.query.instructorID) {
        queryCond.instructorID = req.query.instructorID;
      }
      const Courses = await CourseTable.find(queryCond,{title:1}).skip((CurrentPage - 1) * 5).limit(5);
  
      res.json(Courses);
  
    } 
    catch (err) {
      console.log(err);
    }
};


async function filterCourses (req, res, next) {
    let queryCond = {};
    var CurrentPage = req.query.page? req.query.page:1;
    if (req.query.price) {
      queryCond.price = req.query.price;
      let queryStr = JSON.stringify( queryCond.price);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte|eq|ne)\b/g, match => `$${match}`);
      var Price = JSON.parse(queryStr);
    }
    if (req.query.search){
      try {
        if(req.query.subject || req.query.price ){
          if(req.query.subject && req.query.price){
    
            var y= await CourseTable.find(
              {"price": Price ,"subject": req.query.subject,"instructorID": req.query.instructorID ,$or:[{"title": { "$regex": req.query.search , "$options": "i" }},{"subject": { "$regex": req.query.search , "$options": "i" }}]})
              .skip((CurrentPage - 1) * 5).limit(5);
            console.log(y);
            res.send(y);
    
          }
          else if(req.query.price){
            var y= await CourseTable.find(
              {"price": Price ,"instructorID": req.query.instructorID ,$or:[{"title": { "$regex": req.query.search , "$options": "i" }},{"subject": { "$regex": req.query.search , "$options": "i" }}]})
              .skip((CurrentPage - 1) * 5).limit(5);
            console.log(y);
            res.send(y);
          }
          else{
            var y= await CourseTable.find(
              {"subject": req.query.subject,"instructorID": req.query.instructorID ,$or:[{"title": { "$regex": req.query.search , "$options": "i" }},{"subject": { "$regex": req.query.search , "$options": "i" }}]})
              .skip((CurrentPage - 1) * 5).limit(5);
            console.log(y);
            res.send(y);
          }
        }
        else{
          var y= await CourseTable.find(
            {"instructorID": req.query.instructorID ,$or:[{"title": { "$regex": req.query.search , "$options": "i" }},{"subject": { "$regex": req.query.search , "$options": "i" }}]})
            .skip((CurrentPage - 1) * 5).limit(5);
          res.send(y);
      }} catch (error) {
        console.log(error);
      } 

    } 
    else{
      try {
        var y= await CourseTable.find(
          {"price": Price ,"subject": req.query.subject,"instructorID": req.query.instructorID })
          .skip((CurrentPage - 1) * 5).limit(5);
        console.log(y);
        res.send(y);
      } catch (error) {
        console.log(error);
      }
    }
   };

  
   
async function searchCourses (req, res, next) {
    var CurrentPage = req.query.page?req.query.page:1;
    var y= await CourseTable.find(
      {"instructorID": req.query.instructorID ,$or:[{"title": { "$regex": req.query.search , "$options": "i" }},{"subject": { "$regex": req.query.search , "$options": "i" }}]})
      .skip((CurrentPage - 1) * 5).limit(5);
    console.log(y);
    res.send(y);
    
  };


  async function addCourse (req, res, next)  {

    var x=await instructorTable.find({"userID":req.body.instructorID},{userID:0,_id:0});
     var y=Object.values(x)[0] ;
     console.log(y);
     var name = y.firstname+" "+ y.lastname;
     console.log(name);
  
    const newCourse = new CourseTable({
        title: req.body.title,
        subtitle: req.body.subtitle,
        summary: req.body.summary,
        subject: req.body.subject,
        price: req.body.price,
        instructorID: req.body.instructorID,
        instructorName : name
    });
  
    try {
      newCourse.save();
      res.send(newCourse);
    } catch (err) {
        console.log(err)
    };
  } ;

 
  module.exports = {viewCourses,filterCourses,searchCourses,addCourse};