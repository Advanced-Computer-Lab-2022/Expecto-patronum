const router = require('express').Router();
const connection = require('../config/database');
const CorporateTraineeTable = require('../models/CorporateTraineeSchema');

router.get("/", (req, res) => {
  res.send("Hello, Corporate Trainee");
})

module.exports = router;