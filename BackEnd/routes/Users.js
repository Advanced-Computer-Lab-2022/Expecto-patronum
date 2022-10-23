const router = require('express').Router();
const connection = require('../config/database');
const UsersTable = require('../modals/UserScheme');

router.get("/", (req, res) => {
  res.send("Hello Users");
})


module.exports = router;