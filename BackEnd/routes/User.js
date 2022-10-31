const router = require('express').Router();
const connection = require('../config/database');
const { getRate } = require('../controller/UserController');
const UserTable = require('../models/UserSchema');

router.get("/", (req, res) => {
  res.send("Hello, User");
});

router.get("/countryRate",getRate);

module.exports = router;