const router = require('express').Router();
const connection = require('../config/database');
const CourseTable = require('../models/CourseSchema');

router.get("/", (req, res) => {
  res.send("Hello, Course");
})

module.exports = router;