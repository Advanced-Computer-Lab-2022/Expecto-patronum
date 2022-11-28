const CheckUserType = require("../lib/CheckRoleUtils");
const { genPassword, validPassword } = require("../lib/passwordUtils");
const User = require('../models/UserSchema');
const passport = require('passport');
const countryToCurrency = require('country-to-currency');
const CC = require('currency-converter-lt');
const { CreateToken } = require("../lib/CreateToken");
const { MailValidate } = require("../lib/MailValidation");
const { VerifyTokenDate } = require("../lib/VerfiyTokenDate");
const { Passport } = require("passport");
const ExerciseTable = require('../models/ExcerciseSchema');
const CourseTable = require('../models/CourseSchema');

  async function SelectExercise(req, res, next) {
    try {
        var x = await ExerciseTable.findOne({"_id":req.body.exerciseID},{
            exerciseTitle:1,
            totalGrade:1,
            _id:1
        });
        console.log(x);
        var y = await User.findOne({"_id": req.body.UserID,"purchasedCourses.excercises.excerciseID":req.body.exerciseID},
        {"purchasedCourses.excercises.grade":1});
        console.log(y);
        let q = {};
        if(y){
          q.grade = y.purchasedCourses;
        }
        q.exerciseTitle = x.exerciseTitle;
        q.exerciseID = x._id;
        q.totalGrade = x.totalGrade;
        res.status(200).send(q);
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  };
  module.exports = { SelectExercise}