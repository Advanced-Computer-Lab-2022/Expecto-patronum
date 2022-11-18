const router = require('express').Router();
const connection = require('../config/database');
const { getRate, giveCourseRating } = require('../controller/UserController');
const UserTable = require('../models/UserSchema');

router.get("/", (req, res) => {
  res.send("Hello, User");
});

router.get("/countryRate",getRate);

router.put("/giveCourseRating",giveCourseRating);

module.exports = router;