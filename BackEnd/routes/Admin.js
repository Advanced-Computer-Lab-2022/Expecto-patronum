const router = require('express').Router();
const connection = require('../config/database');

const Admin = require('../models/AdminSchema');
const {viewCourseRequests,grantOrRejectAccess,viewReportedFunctions,markReportedProblem,AcceptOrRejectRefund}= require('../controller/AdminController')


router.get("/", (req, res) => {
  res.send("Hello, Admin");
})

router.get("/viewCourseRequests",viewCourseRequests);

router.put("/grantAccess",grantOrRejectAccess);

router.put("/refund",AcceptOrRejectRefund);



router.get("/viewReportedFunctions", viewReportedFunctions);
router.put("/markReportedProblem", markReportedProblem);


module.exports = router;