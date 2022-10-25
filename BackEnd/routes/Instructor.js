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
  var CurrentPage = req.query.page? req.query.page:1;
  try {
    let queryCond = {};
    if (req.query.instructorID) {
      queryCond.instructorID = req.query.instructorID;
    }
    const Courses = await CourseTable.find(queryCond,{title:1,_id:0});

    res.json(Courses);

  } 
  catch (err) {
    console.log(err);
  }
});

 router.get("/filterCourses", async (req, res, next) => {
  let queryCond = {};
  var CurrentPage = req.query.page? req.query.page:1;
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
  // let queryCond = {};
  // var CurrentPage = req.query.page? req.query.page:1;
  // if (req.query.title) {
  //   queryCond.title = req.query.title;
  // }
  // if (req.query.instructorID) {
  //   queryCond.instructorID = req.query.instructorID;
  // }
  // if(req.query.subject) {
  //     queryCond.subject = req.query.subject;
  // }
  // try {
  //   const Courses = await CourseTable.find(queryCond);
  //   res.json(Courses);
  // } catch (error) {
  //   console.log(error);
  // }

  var CurrentPage = req.query.page?req.query.page:1;
  //  var x=await InstructorTable.find(
  //    { $or:[{"firstname": { "$regex": req.query.search , "$options": "i" }},{"lastname": { "$regex":req.query.search, "$options": "i" }}]}  ).distinct('userID');
  //  console.log(x);
  var y= await CourseTable.find( 
    { $or:[{"title": { "$regex": req.query.search , "$options": "i" }},{"subject": { "$regex": req.query.search , "$options": "i" }},{ instructorID: { $in : req.query.instructorID } }]})
    .skip((CurrentPage - 1) * 5).limit(5);
  console.log(y);
  res.send(y);
  
});

router.post('/addCourse', (req, res, next) => {
  const newCourse = new CourseTable({
      title: req.body.title,
      subtitle: req.body.subtitle,
      summary: req.body.summary,
      subject: req.body.subject,
      price: req.body.price,
      instructorID: req.body.instructorID
  });

  try {
    newCourse.save();
  } catch (err) {
      console.log(err)
  };
});

module.exports = router;
