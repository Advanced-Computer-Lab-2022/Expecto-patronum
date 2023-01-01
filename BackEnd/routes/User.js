const router = require('express').Router();
const connection = require('../config/database');
const { getRate, forgetPassword, ValidateUser, ChangeEmail, UseChangeEmailToken, ChangePassword, ChangeForgottenPassword,
  giveInstructorRating, selectCourse, giveCourseReview, giveInstructorReview, submitAnswer, takeExam, test, ResendEmail } = require('../controller/UserController');
const { genPassword } = require('../lib/passwordUtils');
const { VerifyTokenMiddleware } = require('../middleware/VerifyTokenMiddleware');
const { Charge, addPaymentMethod, getPaymentMethods, deletePaymentMethod } = require('../middleware/StripePayments');
const passport = require('passport');
const { isAuth } = require('../middleware/AuthMiddleware');
const { Logout } = require('../controller/UserController');
const { register } = require('../controller/UserController');
const { giveCourseRating, buyCourse, unbuyCourse, ViewMyCourses, GenerateUsers, ConnectInstructorsWithCourses, getInstructorInfo, updateInstructorInfo } = require('../controller/UserController');
const UserTable = require('../models/UserSchema');

const { isUser, isStudent,isCorporateTrainee } = require('../middleware/RolesMiddleware');

const { SelectExercise, viewAnswer, requestCourse, reportProblem, viewPreviousReports, followUpOnProblem, watchVideo, addNote, viewProfileUser,
  viewNotes, filterNotes, createTransaction, lastWatched, EditNote, DeleteNote, payWithWallet, RecieveMail, viewPreviousRequests, removeCourseReview, removeInstructorReview } = require('../controller/UserController2');
const { isAdmin } = require('../middleware/RolesMiddleware');

router.get("/", (req, res) => {
  res.send("Hello, User");
});






router.get('/MailVerify/:token', VerifyTokenMiddleware, ValidateUser);

router.post('/ResendValidationEmail', ResendEmail);



router.get('/test', test)

router.post('/register', register)
router.post("/forgetPassword", forgetPassword);
router.post("/ChangeForgottenPassword/:token", VerifyTokenMiddleware, ChangeForgottenPassword);
router.post("/ChangePassword", isAuth, ChangePassword);
router.post("/ChangeEmail", isAuth, ChangeEmail);



router.get('/CheckAuth', isAuth, (req, res) => {
  res.status(200).send({ Error: false, Message: 'You are authorized' });
})
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.cookie('user', req.user.firstname + ' ' + req.user.lastname + ' ' + req.user.role, { maxAge: 900000, httpOnly: true });
  const DetailsToSend = {
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    role: req.user.role,
  }
  res.status(200).send(DetailsToSend);
  // res.send("Logged in")
});



router.post("/reportProblem", reportProblem);

//router.post("/createTransaction", createTransaction);

router.get("/forgetPassword/:token", VerifyTokenMiddleware, (req, res) => {
  res.send({ Error: false, Message: 'Token is valid' });
})

router.get("/resetEmail/:token", VerifyTokenMiddleware, isAuth, UseChangeEmailToken, (req, res) => {
  res.redirect('http://localhost:3000/User/Profile');
});
router.get("/countryRate", getRate);
router.get("/takeExam",isAuth,isStudent, takeExam);
router.get("/viewAnswers",isAuth,isStudent, viewAnswer);
router.get('/logout',isAuth, Logout);

router.get("/viewProfile",isAuth,isStudent, viewProfileUser);
router.put("/giveCourseRating",isAuth,isStudent, giveCourseRating);


router.put('/lastWatched',isAuth,isStudent, lastWatched);

router.put('/submitAnswer',isAuth,isStudent, submitAnswer);


router.put("/buyCourse",isAuth,isUser, buyCourse, Charge, unbuyCourse);

router.put("/payWithWallet",isAuth,isUser, payWithWallet);

router.put("/getPaymentMethods",isAuth,isUser, getPaymentMethods);

router.post("/addPaymentMethod",isAuth,isUser, addPaymentMethod);

router.delete("/deletePaymentMethod",isAuth,isUser, deletePaymentMethod);




router.get("/viewMyCourses",isAuth,isStudent, ViewMyCourses);
router.put("/viewPreviousReports",isAuth, viewPreviousReports);
router.put('/viewPreviousRequests',isAuth,isStudent, viewPreviousRequests)
router.put("/filterNotes",isAuth,isStudent,  filterNotes);


router.put("/giveCourseRating",isAuth,isStudent, giveCourseRating);
router.put("/followUpOnProblem",isAuth, followUpOnProblem);
router.put("/addNote",isAuth,isStudent, addNote);

router.put('/watchVideo',isAuth,watchVideo)
router.put('/viewNotes',isAuth,isStudent,viewNotes)
router.post('/EditNote',isAuth,isStudent,EditNote);
router.post('/DeleteNote',isAuth,isStudent,DeleteNote);



//router.post("/GenerateUsers", GenerateUsers);
//router.post("/ConnectInstructorsWithCourses", ConnectInstructorsWithCourses);
//router.get("/getInstructorInfo", getInstructorInfo);
//router.post("/updateInstructorInfo", updateInstructorInfo);

router.put("/giveInstructorRating",isAuth,isStudent, giveInstructorRating);

router.put("/selectCourse", selectCourse);

router.post("/requestCourse",isAuth,isCorporateTrainee,  requestCourse);

router.put("/selectExercise",isAuth, SelectExercise);

router.put("/giveCourseReview",isAuth,isStudent, giveCourseReview);

router.put("/giveInstructorReview",isAuth,isStudent, giveInstructorReview);
router.put("/removeCourseReview", removeCourseReview);
router.put("/removeInstructorReview", removeInstructorReview);

router.post('/RecieveMail', RecieveMail);
module.exports = router;