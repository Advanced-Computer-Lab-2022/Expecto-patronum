const router = require('express').Router();
const connection = require('../config/database');
const instructorTable = require('../models/InstructorSchema');
//const { isInstructor } = require('../middleware/RolesMiddleware');
const CourseTable = require('../models/CourseSchema');
const { query } = require('express');
const {
  viewCourses, filterCourses, addCourse, discount,
  viewCourseRatings, updateBio, testingAll, viewProfile,
  viewInstructorRatingsAndReviews, cancelDiscount,
  filterByRatings, searchCourses, viewAmountOwned,
  viewInstructorPopularCourses, generateAmountOwed,
} = require('../controller/InstructorController');


router.get("/", (req, res, next) => {
  res.send(req.user)
});

router.get("/viewCourses", viewCourses);

router.get("/filterCourses", filterCourses);

router.get("/searchCourses", searchCourses);
router.get("/viewCourseRatings", viewCourseRatings)
router.get("/viewInstructorRatingsAndReviews", viewInstructorRatingsAndReviews);

router.post("/updateBio", updateBio);


router.get("/viewProfile", viewProfile);


router.get("/testingAll", testingAll);
router.put("/filterByRatings", filterByRatings);

router.put("/viewAmountOwned", viewAmountOwned);
router.post("/generateAmountOwed", generateAmountOwed);

router.post('/addCourse', addCourse);

router.post("/discount", discount);

router.put("/cancelDiscount", cancelDiscount);

router.get("/InstructorPopularCourses", viewInstructorPopularCourses);


module.exports = router;

