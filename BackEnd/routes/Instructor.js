const router = require('express').Router();
const connection = require('../config/database');
const instructorTable = require('../models/InstructorSchema');
//const { isInstructor } = require('../middleware/RolesMiddleware');
const CourseTable = require('../models/CourseSchema');
const { query } = require('express');


router.get("/", (req, res, next) => {
  res.send("Hello, Instructor");
});

router.put("/viewCourses", async (req, res, next) => {
  var instID = req.body.instructorID;
  const Courses = await CourseTable.find({instructorID: instID},{title:1,_id : 0});
  res.status(200).send(Courses);
});

//  router.put("/filterCourses", async (req, res, next) => {
//   var Subject1 = new String(JSON.stringify( req.body.subject));
//    var Pri = req.body.price;
//    if(Subject1.length!=0){
//     const Courses = await CourseTable.find({subject: Subject1 });
//      res.status(200).send(Courses);
//    }
//    else{
//      const Courses = await CourseTable.find({price: Pri});
//      res.status(200).send(Courses);

//    }

//  });


module.exports = router;