const router = require('express').Router();
const connection = require('../config/database');
const { viewCourseRequests, grantOrRejectAccess } = require('../controller/AdminController');
const Admin = require('../models/AdminSchema');


router.get("/", (req, res) => {
  res.send("Hello, Admin");
})

router.get("/viewCourseRequests",viewCourseRequests);

router.put("/grantAccess",grantOrRejectAccess);





module.exports = router;