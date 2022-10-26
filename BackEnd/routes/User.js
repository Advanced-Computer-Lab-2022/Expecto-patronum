const router = require('express').Router();
const connection = require('../config/database');
const UserTable = require('../models/UserSchema');

router.get("/", (req, res) => {
  res.send("Hello, User");
})

module.exports = router;