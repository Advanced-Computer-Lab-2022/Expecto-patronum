const router = require('express').Router();
const connection = require('../config/database');
const { getRate, forgetPassword, ValidateUser, ChangeEmail, UseChangeEmailToken, ChangePassword, ChangeForgottenPassword } = require('../controller/UserController');
const { genPassword } = require('../lib/passwordUtils');
const { VerifyTokenMiddleware } = require('../middleware/VerifyTokenMiddleware');
const passport = require('passport');
const { isAuth } = require('../middleware/AuthMiddleware');
const { Logout } = require('../controller/UserController');
const { register } = require('../controller/UserController');
const { giveCourseRating, buyCourse, ViewMyCourses } = require('../controller/UserController');
const UserTable = require('../models/UserSchema');

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

router.post("/forgetPassword", forgetPassword);
router.get("/forgetPassword/:token", VerifyTokenMiddleware, (req, res) => {
  res.send("Please enter new password");
})
router.post("/ChangeForgottenPassword/:token", VerifyTokenMiddleware, ChangeForgottenPassword);
router.post("/ChangePassword", isAuth, ChangePassword);

router.post("/ChangeEmail", isAuth, ChangeEmail);
router.get("/resetEmail/:token", VerifyTokenMiddleware, isAuth, UseChangeEmailToken);

router.get("/countryRate", getRate);


router.get('/logout', Logout);


router.put("/buyCourse", buyCourse);

router.put("/viewMyCourses", ViewMyCourses);

router.put("/giveCourseRating", giveCourseRating);

module.exports = router;