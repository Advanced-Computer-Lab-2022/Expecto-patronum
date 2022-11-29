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
        var y = await User.findOne({"_id": req.query.userID,"purchasedCourses.excercises.excerciseID":req.query.exerciseID},
        {purchasedCourses:{ $elemMatch : {courseID:req.query.courseID}}}
        );
        let q = {};
        if(y){
          var exe = y.purchasedCourses[0].excercises;
          for(var i = 0; i<exe.length;i++){
            if(exe[i].excerciseID ==req.query.exerciseID){
              if(exe[i].grade){
              q.yourGrade =exe[i].grade;
              }
              break;
            };
          }
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

  async function viewAnswer(req, res, next) {
    try {
        var x = await ExerciseTable.findOne({"_id":req.query.exerciseID},{
            exerciseTitle:1,
            totalGrade:1,
            _id:1,
            questions:1
        });
        var y = await User.findOne({"_id": req.query.userID,"purchasedCourses.excercises.excerciseID":req.query.exerciseID},
        {purchasedCourses:{ $elemMatch : {courseID:req.query.courseID}}}
        );
        console.log(y);
        let q = {};
        if(y){
        var exe = y.purchasedCourses[0].excercises;
        for(var i = 0; i<exe.length;i++){
          if(exe[i].excerciseID ==req.query.exerciseID){
            if(exe[i].grade){
            q.yourGrade =exe[i].grade;
            }
            q.yourAnswers = exe[i].exercisesAnswers.answer;
            break;
          };
        }

        }
        q.exerciseTitle = x.exerciseTitle;
        q.exerciseID = x._id;
        q.totalGrade = x.totalGrade;
        q.questions = x.questions;
        res.status(200).send(q);
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  };


  module.exports = { SelectExercise,viewAnswer}