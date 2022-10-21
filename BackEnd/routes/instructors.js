const router = require('express').Router();
const connection = require('../config/database');
const { isAuth } = require('./AuthMiddleware');
const instructorTable = require('../modals/instructorsSchema');




router.get("/", (req, res) => {
  res.send("Hello Instructor");
});


module.exports = router;