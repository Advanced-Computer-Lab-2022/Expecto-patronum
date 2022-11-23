const router = require('express').Router();
const connection = require('../config/database');
const instructorTable = require('../models/InstructorSchema');
//const { isInstructor } = require('../middleware/RolesMiddleware');
const CourseTable = require('../models/CourseSchema');
const { query } = require('express');
const { viewCourses, filterCourses, addCourse, discount, viewCourseRatings,testAll } = require('../controller/InstructorController');


router.get("/", (req, res, next) => {
  res.send("Hello, Instructor");
});

router.get("/viewCourses",viewCourses);

 router.get("/filterCourses",filterCourses);

 router.get("/viewCourseRatings",viewCourseRatings)

 router.get("/testAll",testAll)

router.post('/addCourse',addCourse);

router.put("/discount",discount);



module.exports = router;

