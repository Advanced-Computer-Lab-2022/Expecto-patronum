const router = require('express').Router();
const connection = require('../config/database');
const Admin = require('../models/AdminSchema');


router.get("/", (req, res) => {
  res.send("Hello, Admin");
})

module.exports = router;