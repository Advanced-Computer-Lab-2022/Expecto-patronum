const CheckUserType = require("../lib/CheckRoleUtils");
const { genPassword, validPassword } = require("../lib/passwordUtils");
const { default: mongoose } = require('mongoose');
const CourseTable = require('../models/CourseSchema');
const User = require('../models/UserSchema');
const ExerciseTable = require('../models/ExcerciseSchema');
const requestTable = require('../models/RequestSchema');
const problemTable=require('../models/ProblemSchema');

async function viewCourseRequests(req, res, next) {
    var CurrentPage = req.query.page ? req.query.page : 1;
    try {
      const request = await requestTable.find( {type :"requestCourse"}).skip((CurrentPage - 1) * 10).limit(10);
      var TotalCount = await requestTable.countDocuments({type :"requestCourse"});
      res.send({ requests: request, TotalCount: TotalCount});
    }
    catch (err) {
      res.status(400).json({error:err.message})
    }
  };

  async function grantOrRejectAccess(req, res, next) {
    try {
        if(req.body.granted=="true"){
        const user = await User.findByIdAndUpdate({ "_id": req.body.userID },
        { $push: { "purchasedCourses.courseID": req.body.courseID } }, { new: true });

        const request =  await requestTable.findByIdAndUpdate({ "_id": req.body.requestID },
        { $set: { "status": "accepted" } }, { new: true });
        res.send(200).send("access granted");
        }
        else{
            const request =  await requestTable.findByIdAndUpdate({ "_id": req.body.requestID },
            { $set: { "status": "rejected" } }, { new: true });
            res.send(200).send("access denied");
        }
      }
      catch (err) {
        res.status(400).json({error:err.message})
      }
     
  };

  async function viewReportedFunctions(req,res,next){
    try{
      var problems=await problemTable.find();
      res.send(problems);
    }
    catch(error){
      console.log(error);
    }
  }

  module.exports = {viewCourseRequests}