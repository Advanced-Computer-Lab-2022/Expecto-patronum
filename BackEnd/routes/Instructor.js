const router = require('express').Router();
const connection = require('../config/database');
const instructorTable = require('../models/InstructorSchema');
//const { isInstructor } = require('../middleware/RolesMiddleware');
const CourseTable = require('../models/CourseSchema');
const { query } = require('express');
const { viewCourses, filterCourses, addCourse } = require('../controller/InstructorController');


router.get("/", (req, res, next) => {
  res.send("Hello, Instructor");
});

router.get("/viewCourses",viewCourses);

 router.get("/filterCourses",filterCourses);

router.post('/addCourse',addCourse);


module.exports = router;

