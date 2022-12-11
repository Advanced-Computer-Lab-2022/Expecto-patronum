const router = require('express').Router();
const connection = require('../config/database');
const { viewCourseRequests, grantOrRejectAccess,AcceptOrRejectRefund } = require('../controller/AdminController');
const Admin = require('../models/AdminSchema');


router.get("/", (req, res) => {
  res.send("Hello, Admin");
})

router.get("/viewCourseRequests",viewCourseRequests);

router.put("/grantAccess",grantOrRejectAccess);

router.put("/refund",AcceptOrRejectRefund);





module.exports = router;