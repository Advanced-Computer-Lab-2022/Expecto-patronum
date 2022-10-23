const router = require('express').Router();
const connection = require('../config/database');
const CoursesTable = require('../modals/CourseSchema');

router.get("/", (req, res) => {
  res.send("Hello Courses");
})

module.exports = router;