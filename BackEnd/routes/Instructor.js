const router = require('express').Router();
const connection = require('../config/database');
const instructorTable = require('../models/InstructorSchema');
//const { isInstructor } = require('../middleware/RolesMiddleware');
const CourseTable = require('../models/CourseSchema');
const { query } = require('express');


router.get("/", (req, res, next) => {
  res.send("Hello, Instructor");
});

router.get("/viewCourses", async (req, res, next) => {
  try {
    let queryCond = {};
    if (req.query.instructorID) {
      queryCond.instructorID = req.query.instructorID;
    }
    const Courses = await CourseTable.find(queryCond);

    res.json(Courses);

  } 
  catch (err) {
    console.log(err);
  }
});

 router.get("/filterCourses", async (req, res, next) => {
  let queryCond = {};
  if (req.query.price) {
    queryCond.price = req.query.price;
    let queryStr = JSON.stringify( queryCond.price);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|eq|ne)\b/g, match => `$${match}`);
    queryCond.price = JSON.parse(queryStr);
  }
  if (req.query.instructorID) {
    queryCond.instructorID = req.query.instructorID;
  }
  if(req.query.subject) {
      queryCond.subject = req.query.subject;
  }
  try {
    const Courses = await CourseTable.find(queryCond);
    res.json(Courses);
  } catch (error) {
    console.log(error);
  }  
 });

 router.get("/searchCourses", async (req, res, next) => {
  let queryCond = {};

  if (req.query.title) {
    queryCond.title = req.query.title;
  }
  if (req.query.instructorID) {
    queryCond.instructorID = req.query.instructorID;
  }
  if(req.query.subject) {
      queryCond.subject = req.query.instructorID;
  }
  try {
    const Courses = await CourseTable.find(queryCond);
    res.json(Courses);
  } catch (error) {
    console.log(error);
  }
  
});


module.exports = router;


  
  // try {
  //   if(price_min==0 && price_max==0 && Subject1==null){
  //     const Courses = await CourseTable.find();
  //     res.status(200).send(Courses);
  //   }
  //   else{
  //     if(price_min==0 && price_max==0){
          
  //         const Courses = await CourseTable.find({instructorID: instID,subject: Subject1});
  //         res.status(200).send(Courses);
  //     }
  //     else if(Subject1==null ){
  //         if(price_max==0){
  //           const Courses = await CourseTable.find({instructorID: instID,price:{ $gte: price_min}});
  //           res.status(200).send(Courses);
  //         }
  //         else{
  //         const Courses = await CourseTable.find({instructorID: instID,price:{ $gte: price_min, $lte: price_max }});
  //         res.status(200).send(Courses);
  //       }
  //     }
  //     else{
  //         if(price_max==0){
  //           const Courses = await CourseTable.find({instructorID: instID,price: { $gte: price_min},subject: Subject1});
  //           res.status(200).send(Courses);
  //         }
  //         else{
  //           const Courses = await CourseTable.find({instructorID: instID,price: { $gte: price_min, $lte: price_max },subject: Subject1});
  //           res.status(200).send(Courses);
  //         }
  //     }
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
