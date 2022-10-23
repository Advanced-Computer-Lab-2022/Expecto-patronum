const router = require('express').Router();
const connection = require('../config/database');
const CorpTraineeTable = require('../modals/CorpTraineeSchema');



router.get("/", (req, res) => {
  res.send("Hello CorpTrainee");
})

module.exports = router;