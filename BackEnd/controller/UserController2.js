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
        x = await ExerciseTable.find({"_id":req.body.exerciseID},{
            exerciseTitle:1,
            totalGrade:1,
            
        });
        for (var i = 0; i < y.purchasedCourses.length; i++) {
          var z = Object.values(y.purchasedCourses)[i];
          ids[i] = z.courseID;
          console.log(ids[i]);
        }
        res.send(x);
    } catch (error) {
      console.log(error);
    }
  };