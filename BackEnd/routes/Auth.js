const router = require('express').Router();
const passport = require('passport');
const passwordUtils = require('../lib/passwordUtils');
const connection = require('../config/database');
const genPassword = require('../lib/passwordUtils').genPassword;
const { Passport } = require('passport');
const Admin = require('../models/AdminSchema');
const Instructor = require('../models/InstructorSchema');
const CorporateTrainee = require('../models/CorporateTraineeSchema');
const { isAuth } = require('../middleware/AuthMiddleware');
const { Logout } = require('../controller/UserController');
const { register } = require('../controller/UserController');




/**
 * -------------- POST ROUTES ----------------
 */

// TODO
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send("Logged in")
});

// TODO 
router.get("/Check", isAuth, (req, res) => {
  res.send("Hello User");
})

router.post('/register', register)

router.get('/logout', Logout);

/**
* -------------- GET ROUTES ----------------
*/



// When you visit http://localhost:3000/login, you will see "Login Page"


// When you visit http://localhost:3000/register, you will see "Register Page"


/**
 * Lookup how to authenticate users on routes with Local Strategy
 * Google Search: "How to use Express Passport Local Strategy"
 * 
 * Also, look up what behaviour express session has without a maxage set
 */


// Visiting this route logs the user out



module.exports = router;