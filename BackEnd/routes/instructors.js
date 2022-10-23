const router = require('express').Router();
const connection = require('../config/database');
const { isAuth } = require('./AuthMiddleware');
const instructorTable = require('../modals/instructorsSchema');
const { isInstructer } = require('./RolesMiddleware');




router.get("/", isInstructer, (req, res, next) => {
  res.send("Hello Instructor");
});


module.exports = router;