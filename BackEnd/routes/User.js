const router = require('express').Router();
const connection = require('../config/database');
const { getRate, forgetPassword, ValidateUser, ChangeEmail, UseChangeEmailToken, ChangePassword, ChangeForgottenPassword,
  giveInstructorRating, selectCourse, giveCourseReview, giveInstructorReview, submitAnswer, takeExam, test } = require('../controller/UserController');
const { genPassword } = require('../lib/passwordUtils');
const { VerifyTokenMiddleware } = require('../middleware/VerifyTokenMiddleware');
const passport = require('passport');
const { isAuth } = require('../middleware/AuthMiddleware');
const { Logout } = require('../controller/UserController');
const { register } = require('../controller/UserController');
const { giveCourseRating, buyCourse, ViewMyCourses,GenerateUsers, ConnectInstructorsWithCourses, getInstructorInfo, updateInstructorInfo } = require('../controller/UserController');
const UserTable = require('../models/UserSchema');
const { SelectExercise, viewAnswer,requestCourse,reportProblem } = require('../controller/UserController2');

router.get("/", (req, res) => {
  res.send("Hello, User");
});

router.get("/login", (req, res) => {
  res.send("Login");
});
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send("Logged in")
});


router.post('/register', register)
router.get('/MailVerify/:token', VerifyTokenMiddleware, ValidateUser);
router.get('/test', test)

router.post("/forgetPassword", forgetPassword);
router.post("/reportProblem", reportProblem);

router.get("/forgetPassword/:token", VerifyTokenMiddleware, (req, res) => {
  res.send({ Error: false, Message: 'Token is valid' });
})
router.post("/ChangeForgottenPassword/:token", VerifyTokenMiddleware, ChangeForgottenPassword);
router.post("/ChangePassword", isAuth, ChangePassword);

router.post("/ChangeEmail", isAuth, ChangeEmail);
router.get("/resetEmail/:token", VerifyTokenMiddleware, isAuth, UseChangeEmailToken, (req, res) => {
  res.redirect('http://localhost:3000/User/Profile');
});

router.get("/countryRate", getRate);


router.get('/logout', Logout);

router.put('/submitAnswer', submitAnswer);


router.put("/buyCourse", buyCourse);

router.get("/takeExam", takeExam);

router.get("/viewAnswers", viewAnswer);

router.get("/viewMyCourses", ViewMyCourses);

router.put("/giveCourseRating", giveCourseRating);


//router.post("/GenerateUsers", GenerateUsers);
//router.post("/ConnectInstructorsWithCourses", ConnectInstructorsWithCourses);
//router.get("/getInstructorInfo", getInstructorInfo);
//router.post("/updateInstructorInfo", updateInstructorInfo);

router.put("/giveInstructorRating", giveInstructorRating);

router.put("/selectCourse", selectCourse);

router.post("/requestCourse", requestCourse);

router.put("/selectExercise", SelectExercise);

router.put("/giveCourseReview", giveCourseReview);

router.put("/giveInstructorReview", giveInstructorReview);
module.exports = router;