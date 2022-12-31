const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const session = require('express-session');
var passport = require('passport');
var crypto = require('crypto');
var CoursesRoute = require('./routes/Course');
var CorpTraineeRoute = require('./routes/CorporateTrainee');
var InstructorRoute = require('./routes/Instructor');
var UsersRoute = require('./routes/User');
var AdminRoute = require('./routes/Admin');
const connection = require('./config/database');
const { isAuth } = require('./middleware/AuthMiddleware');

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
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));


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
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:5000
app.listen(5000, () => {
  console.log("Server listening on port 5000");
});

/**
 * -------------- ROUTES ----------------
 */


app.use('/Courses', CoursesRoute);
app.use('/Admin', AdminRoute);
app.use('/Instructor', InstructorRoute);
app.use('/User', UsersRoute);
app.use('/CorporateTrainee', CorpTraineeRoute);



// Imports all of the routes from ./routes/index.js