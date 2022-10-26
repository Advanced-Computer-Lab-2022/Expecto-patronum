const router = require('express').Router();
const connection = require('../config/database');
const instructorTable = require('../models/InstructorSchema');
const { isInstructor } = require('../middleware/RolesMiddleware');


router.get("/", isInstructor, (req, res, next) => {
  res.send("Hello, Instructor");
});


module.exports = router;