const router = require('express').Router();
const connection = require('../config/database');
const { isAuth } = require('./AuthMiddleware');
const CorpTraineeTable = require('../modals/CorpTraineeSchema');



router.get("/", (req, res) => {
  res.send("Hello CorpTrainee");
})

module.exports = router;