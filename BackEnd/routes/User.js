const router = require('express').Router();
const connection = require('../config/database');
const { getRate, giveCourseRating, buyCourse, ViewMyCourses } = require('../controller/UserController');
const UserTable = require('../models/UserSchema');

router.get("/", (req, res) => {
  res.send("Hello, User");
});

router.get("/countryRate",getRate);

router.put("/buyCourse",buyCourse);

router.put("/viewMyCourses",ViewMyCourses);

router.put("/giveCourseRating",giveCourseRating);

module.exports = router;