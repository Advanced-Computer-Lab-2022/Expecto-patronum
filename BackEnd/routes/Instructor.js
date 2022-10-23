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

 router.put("/filterCourses", async (req, res, next) => {
  var instID = req.body.instructorID;
  var Subject1 =  req.body.subject ? req.body.subject :null;
  var price_min = req.body.price_min? req.body.price_min : 0;
  var price_max = req.body.price_max? req.body.price_max : 0;
  if(price_min==0 && price_max==0 && Subject1==null){
    const Courses = await CourseTable.find();
    res.status(200).send(Courses);
  }
  else{
    if(price_min==0 && price_max==0){
        const Courses = await CourseTable.find({instructorID: instID,subject: Subject1});
        res.status(200).send(Courses);
    }
    else if(Subject1==null ){
        if(price_max==0){
          const Courses = await CourseTable.find({instructorID: instID,price:{ $gt: price_min}});
          res.status(200).send(Courses);
        }
        else{
        const Courses = await CourseTable.find({instructorID: instID,price:{ $gt: price_min, $lt: price_max }});
        res.status(200).send(Courses);
      }
    }
    else{
        if(price_max==0){
          const Courses = await CourseTable.find({instructorID: instID,price: { $gt: price_min},subject: Subject1});
          res.status(200).send(Courses);
        }
        else{
          const Courses = await CourseTable.find({instructorID: instID,price: { $gt: price_min, $lt: price_max },subject: Subject1});
          res.status(200).send(Courses);
        }
    }
  }

 });


module.exports = router;