const router = require('express').Router();
const connection = require('../config/database');
const { isAuth } = require('./AuthMiddleware');
const CoursesTable = require('../modals/CourseSchema');

router.get("/", (req, res) => {
  res.send("Hello Courses");
})

module.exports = router;