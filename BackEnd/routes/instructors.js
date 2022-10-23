const router = require('express').Router();
const connection = require('../config/database');
const instructorTable = require('../modals/instructorsSchema');
const { isInstructer } = require('../middleware/RolesMiddleware');


router.get("/", isInstructer, (req, res, next) => {
  res.send("Hello Instructor");
});


module.exports = router;