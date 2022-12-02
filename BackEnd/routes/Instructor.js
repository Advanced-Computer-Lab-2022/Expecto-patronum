const router = require('express').Router();
const connection = require('../config/database');
const instructorTable = require('../models/InstructorSchema');
//const { isInstructor } = require('../middleware/RolesMiddleware');
const CourseTable = require('../models/CourseSchema');
const { query } = require('express');
const { viewCourses, filterCourses, addCourse, discount, viewCourseRatings, updateBio, testingAll, viewProfile, viewInstructorRatingsAndReviews } = require('../controller/InstructorController');


router.get("/", (req, res, next) => {
  res.send("Hello, Instructor");
});

router.get("/viewCourses",viewCourses);

 router.get("/filterCourses",filterCourses);

 router.get("/viewCourseRatings",viewCourseRatings)
 router.get("/viewInstructorRatingsAndReviews", viewInstructorRatingsAndReviews);

 router.get("/updateBio",updateBio);

 
 router.get("/viewProfile",viewProfile);


 router.get("/testingAll",testingAll);



router.post('/addCourse',addCourse);

router.put("/discount",discount);



module.exports = router;

