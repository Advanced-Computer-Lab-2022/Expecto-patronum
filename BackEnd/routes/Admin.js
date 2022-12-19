const router = require('express').Router();
const connection = require('../config/database');

const Admin = require('../models/AdminSchema');
const {viewCourseRequests,grantOrRejectAccess,viewReportedFunctions,markReportedProblem,
  AcceptOrRejectRefund,promotion,cancelPromotion,viewRefundRequests}= require('../controller/AdminController')


router.get("/", (req, res) => {
  res.send("Hello, Admin");
})

router.get("/viewCourseRequests",viewCourseRequests);

router.get("/viewRefunds",viewRefundRequests);

router.put("/grantAccess",grantOrRejectAccess);

router.put("/refund",AcceptOrRejectRefund);

router.put("/givePromotion",promotion);

router.put("/cancelPromotion",cancelPromotion);

router.get("/viewReportedFunctions", viewReportedFunctions);
router.put("/markReportedProblem", markReportedProblem);


module.exports = router;