const connection = require('../config/database');
const instructorTable = require('../models/InstructorSchema');
const User = require('../models/UserSchema');
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
      const Courses = await CourseTable.find(queryCond,{
        _id: 1,
        title: 1,
        courseHours: 1,
        price: 1 ,
        courseImage: 1,
        rating: 1,
        instructorName: 1,
        subject: 1,
        summary:1
      });

      var TotalCount=Courses.length;
      var searchResults= Courses.slice((CurrentPage - 1) * 5, CurrentPage * 5);
      res.send({ Courses: searchResults ,TotalCount:TotalCount});
  
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
      queryCond.price = Price;
    }
    if (req.query.search){
      try {
        if(req.query.subject || req.query.price ){
          if(req.query.subject && req.query.price){
    
            var y= await CourseTable.find(
              {"price": Price ,"subject": req.query.subject,"instructorID": req.query.instructorID ,$or:[{"title": { "$regex": req.query.search , "$options": "i" }},{"subject": { "$regex": req.query.search , "$options": "i" }}]})
              .select({
                _id: 1,
                title: 1,
                courseHours: 1,
                price: 1 ,
                courseImage: 1,
                rating: 1,
                instructorName: 1,
                subject: 1,
                summary:1
              });
              var TotalCount=y.length;
              var searchResults= y.slice((CurrentPage - 1) * 5, CurrentPage * 5);
              res.send({ Courses: searchResults ,TotalCount:TotalCount});
    
          }
          else if(req.query.price){
            var y= await CourseTable.find(
              {"price": Price ,"instructorID": req.query.instructorID ,$or:[{"title": { "$regex": req.query.search , "$options": "i" }},{"subject": { "$regex": req.query.search , "$options": "i" }}]})
              .select({
                _id: 1,
                title: 1,
                courseHours: 1,
                price: 1 ,
                courseImage: 1,
                rating: 1,
                instructorName: 1,
                subject: 1,
                summary:1
              });
              var TotalCount=y.length;
              var searchResults= y.slice((CurrentPage - 1) * 5, CurrentPage * 5);
              res.send({ Courses: searchResults ,TotalCount:TotalCount});
          }
          else{
            var y= await CourseTable.find(
              {"subject": req.query.subject,"instructorID": req.query.instructorID ,$or:[{"title": { "$regex": req.query.search , "$options": "i" }},{"subject": { "$regex": req.query.search , "$options": "i" }}]})
              .select({
                _id: 1,
                title: 1,
                courseHours: 1,
                price: 1 ,
                courseImage: 1,
                rating: 1,
                instructorName: 1,
                subject: 1,
                summary:1
              });
              var TotalCount=y.length;
              var searchResults= y.slice((CurrentPage - 1) * 5, CurrentPage * 5);
              res.send({ Courses: searchResults ,TotalCount:TotalCount});
          }
        }
        else{
          var y= await CourseTable.find(
            {"instructorID": req.query.instructorID ,$or:[{"title": { "$regex": req.query.search , "$options": "i" }},{"subject": { "$regex": req.query.search , "$options": "i" }}]})
            .select({
              _id: 1,
              title: 1,
              courseHours: 1,
              price: 1 ,
              courseImage: 1,
              rating: 1,
              instructorName: 1,
              subject: 1,
              summary:1
            });
            var TotalCount=y.length;
            var searchResults= y.slice((CurrentPage - 1) * 5, CurrentPage * 5);
            res.send({ Courses: searchResults ,TotalCount:TotalCount});
      }} catch (error) {
        console.log(error);
      } 

    } 
    else{
      try {
        if (req.query.instructorID) {
          queryCond.instructorID = req.query.instructorID;
        }
        if(req.query.subject) {
            queryCond.subject = req.query.subject;
        }
        var y= await CourseTable.find(queryCond)
        .select({
          _id: 1,
          title: 1,
          courseHours: 1,
          price: 1 ,
          courseImage: 1,
          rating: 1,
          instructorName: 1,
          subject: 1,
          summary:1
        });

        var TotalCount=y.length;
        var searchResults= y.slice((CurrentPage - 1) * 5, CurrentPage * 5);
        res.send({ Courses: searchResults ,TotalCount:TotalCount});
      } catch (error) {
        console.log(error);
      }
    }
   };

  

  async function addCourse (req, res, next)  {

    var x=await User.find({"_id":req.body.instructorID},{firstname:1,lastname:1,_id:0});
     var y=Object.values(x)[0] ;
     console.log(y);
     var name = y.firstname+" "+ y.lastname;
     console.log(name);
  
    const newCourse = new CourseTable({
      instructorID: req.body.instructorID,
        title: req.body.title,
        summary: req.body.summary,
        subtitles: req.body.subtitles,
        subject: req.body.subject,
        price: req.body.price,
        skills: req.body.skills,
        level: req.body.level,
        courseHours: req.body.courseHours,
        exercises:req.body.exercises,
        rating: req.body.rating,
        instructorName : name
    });
  
    try {
      newCourse.save();
      res.send(newCourse);
    } catch (err) {
        console.log(err)
    };
  } ;

 
  module.exports = {viewCourses,filterCourses,addCourse};