const router = require('express').Router();
const connection = require('../config/database');
const Course = require('../models/CourseSchema');
const CourseSearch = require("../controller/CourseSearch");
const Instructor = require('../models/InstructorSchema');

router.get("/", (req, res) => {
  res.send(CourseSearch("course1", CourseTable));
})

router.post("/", async (req, res) => {

  res.send("Added " + req.body.title + " Course");

  const newCourse = {
    title: req.body.title,
    subtitle: req.body.subtitle,
    summary: req.body.summary,
    price: req.body.price,
    subject: req.body.subject,
    instructorID: req.body.instructorID,
    instructorName: req.body.instructorName
  }

  await Course.create(newCourse);
})

router.post("/CourseSearch", async (req, res) => {
  
  const userSearch = req.body.user;

  const searchResults = await Course.find({$or:[{title: {$regex : userSearch, $options: "i"}}, 
                                                {subject: {$regex : userSearch, $options: "i"}}, 
                                                {instructorName: {$regex : userSearch, $options: "i"}}
                                               ]});

  res.send({searchResults: searchResults});
})

module.exports = router;