const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
var passport = require('passport');
var crypto = require('crypto');
var AuthRoute = require('./routes/Auth');
var CoursesRoute = require('./routes/Courses');
var CorpTraineeRoute = require('./routes/CorpTrainee');
var instrucerRoute = require('./routes/instructors');
var UsersRoute = require('./routes/Users');
var AdminRoute = require('./routes/Admin');





const connection = require('./config/database');
const { isAuth } = require('./routes/AuthMiddleware');

// Package documentation - https://www.npmjs.com/package/connect-mongo
const MongoStore = require('connect-mongo')(session);

// Need to require the entire Passport config module so app.js knows about it
require('./config/passport');
/**
 * -------------- GENERAL SETUP ----------------
 */
// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



/**
 * 
 * 
 * -------------- SESSION SETUP ----------------
 */
const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'session' })
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  unset: 'destroy',
  cookie: { maxAge: 14 * 24 * 3600000 }


}))

// TODO

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

app.use(passport.initialize());
app.use(passport.session());


/**
 * -------------- ROUTES ----------------
 */

app.get("/", (req, res) => {
  res.send("Home page")
})
app.use('/Auth', AuthRoute);
app.use('/Courses', CoursesRoute);
app.use('/Admin', AdminRoute);
app.use('/instructors', instrucerRoute);
app.use('/Users', UsersRoute);
app.use('/CorpTrainee', CorpTraineeRoute);












// Imports all of the routes from ./routes/index.js


/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(3000);