const router = require('express').Router();
const passport = require('passport');
const passwordUtils = require('../lib/passwordUtils');
const connection = require('../config/database');
const genPassword = require('../lib/passwordUtils').genPassword;
const { Passport } = require('passport');
const User = require('../models/UserSchema');
const Admin = require('../models/AdminSchema');
const Instructor = require('../models/InstructorSchema');
const CorporateTrainee = require('../models/CorporateTraineeSchema');
const { isAuth } = require('../middleware/AuthMiddleware');


function CheckUserType(user) {
    console.log(user.role);
    let RoleTable = '';
    if (user.role === "Admin") {
        console.log("I am admin");
        RoleTable = new Admin({
            userID: user._id
        });

    }
    else if (user.role === "Instructor") {
        console.log("I am instructor");
        RoleTable = new Instructor({
            userID: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
        });

    }
    else if (user.role === "CorporateTrainee") {
        RoleTable = new CorporateTrainee({
            userID: user._id
        });
    }
    if (RoleTable !== '') {
        try {
            RoleTable.save()

        } catch (err) {
            console.log(err);
        }
    }
}

/**
 * -------------- POST ROUTES ----------------
 */

// TODO
router.post('/login', passport.authenticate('local', { failureRedirect: '/Auth/login-failure', successRedirect: '/Auth/login-success' }));

// TODO 

router.post('/register', (req, res, next) => {
    const saltHash = genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    const newUser = new User({
        username: req.body.username,
        hash: hash,
        salt: salt,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: req.body.role
    });

    try {

        newUser.save()
            .then((newUser) => {
                CheckUserType(newUser);
            });
    } catch (err) {
        console.log(err)
    };

    res.redirect('/Auth/login');
});

/**
* -------------- GET ROUTES ----------------
*/

router.get('/', (req, res, next) => {
    res.send('<h1>GuestPage</h1><p>Please <a href="/Auth/register">register</a></p>');
});


// When you visit http://localhost:3000/login, you will see "Login Page"
router.get('/login', (req, res, next) => {
    const form = '<h1>Login Page</h1><form method="POST" action="/Auth/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});

// When you visit http://localhost:3000/register, you will see "Register Page"
router.get('/register', (req, res, next) => {

    const form = '<h1>Register Page</h1><form method="post" action="/Auth/register">\
                    Enter Username:<br><input type="text" name="username">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});

/**
 * Lookup how to authenticate users on routes with Local Strategy
 * Google Search: "How to use Express Passport Local Strategy"
 * 
 * Also, look up what behaviour express session has without a maxage set
 */
router.get('/protected-route', isAuth, (req, res, next) => {
    // This is how you check if a user is authenticated and protect a route.  You could turn this into a custom middleware to make it less redundant
    res.send('<h1>You are authenticated</h1><p><a href="/Auth/logout">Logout and reload</a></p>');

});

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.redirect('/Auth/protected-route');
});

router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/Auth/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});

module.exports = router;