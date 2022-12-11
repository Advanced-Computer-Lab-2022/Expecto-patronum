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
const requestTable = require('../models/RequestSchema');
const problemTable = require('../models/ProblemSchema');

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
        q.totalGrade = y.grade;
        }
        q.exerciseTitle = x.exerciseTitle;
        q.exerciseID = x._id;
        q.totalGrade=x.totalGrade;
        q.questions = x.questions;
        res.status(200).send(q);
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  };

  async function requestCourse(req, res, next) {

    var x = await User.findOne({ "_id": req.body.userID }, {role:1, _id: 1,username:1 });
    var y = await CourseTable.findOne({ "_id": req.body.courseID }, {_id: 1,title:1 });
    if(x.role =="CorporateTrainee"){
     const date = new Date();
      const newRequest = new requestTable({
        type:'requestCourse',
        userID: req.body.userID,
        username: x.username,
        courseID:req.body.courseID,
        courseTitle:y.title,
        startDate:date,
        body:req.body.body
      });
      try {
        newRequest.save();
        res.status(200).send(newRequest);  
      } catch (err) {
        res.status(400).json({error:err.message})
      };
    }
  };

  async function reportProblem(req,res,next){
    try{
      const result = await problemTable.create({
        type: req.body.type,
        userID: req.body.userID,
        //status: req.body.status,
        body: req.body.body,
        courseID: req.body.courseID,
        startDate: Date.now(),
        //comment: req.body.comment,
      });
      result.save();
      res.status(200).send(result);
    }
    catch(error){
      console.log(error);
    }

  }


  module.exports = { SelectExercise,viewAnswer,requestCourse,reportProblem}