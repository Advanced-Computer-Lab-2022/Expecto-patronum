const CheckUserType = require("../lib/CheckRoleUtils");
const { genPassword, validPassword } = require("../lib/passwordUtils");
const { default: mongoose } = require('mongoose');
const CourseTable = require('../models/CourseSchema');
const User = require('../models/UserSchema');
const ExerciseTable = require('../models/ExcerciseSchema');
const requestTable = require('../models/RequestSchema');
const problemTable=require('../models/ProblemSchema');
const transactionTable = require('../models/transactionSchema');

async function viewCourseRequests(req, res, next) {
    var CurrentPage = req.query.page ? req.query.page : 1;
    try {
      const request = await requestTable.find( {type :"RequestCourse"}).skip((CurrentPage - 1) * 10).limit(10);
      var TotalCount = await requestTable.countDocuments({type :"requestCourse"});
      res.send({ requests: request, TotalCount: TotalCount});
    }
    catch (err) {
      res.status(400).json({error:err.message})
    }
  };

  async function viewRefundRequests(req, res, next) {
    var CurrentPage = req.query.page ? req.query.page : 1;
    try {
      const request = await requestTable.find( {type :"Refund"}).skip((CurrentPage - 1) * 10).limit(10);
      var TotalCount = await requestTable.countDocuments({type :"Refund"});
      res.send({ refunds: request, TotalCount: TotalCount});
    }
    catch (err) {
      res.status(400).json({error:err.message})
    }
  };

  async function grantOrRejectAccess(req, res, next) {
    try {
        if(req.body.granted=="true"){
          const request =  await requestTable.findByIdAndUpdate({ "_id": req.body.requestID },
          { $set: { "status": "accepted" } }, { new: true });
    
        const user = await User.findByIdAndUpdate({ "_id": request.userID },
        { $push: { "purchasedCourses":{courseID:request.courseID }} }, { new: true });

        const course =  await CourseTable.findByIdAndUpdate({ "_id": request.courseID },
        { $inc: { "purchases": 1 } }, { new: true });
        res.status(200).send("access granted");
        }


        else{
            const request =  await requestTable.findByIdAndUpdate({ "_id": req.body.requestID },
            { $set: { "status": "rejected" } }, { new: true });
            res.status(200).send("access denied");
        }
      }
      catch (err) {
        console.log(err);
        res.status(400).json({error:err.message})
      }
     
  };

  async function AcceptOrRejectRefund(req, res, next) {
    try {
        if(req.body.refund=="Accept"){

        const request =  await requestTable.findByIdAndUpdate({ "_id": req.body.requestID },
        { $set: { "status": "accepted" } }, { new: true });

        const trans =  await transactionTable.findOne({ "userID":request.userID,"courseID" : request.courseID});

        const user = await User.findByIdAndUpdate({ "_id": request.userID },
        { $pull: { "purchasedCourses":{courseID:request.courseID }},
            $inc :{wallet:trans.transactionAmount}}, { new: true });

        const course =  await CourseTable.findByIdAndUpdate({ "_id": request.courseID },
        { $inc: { "purchases": -1 } }, { new: true });

          var w = -trans.transactionAmount;
        const result = await transactionTable.create({
          userID: request.userID,
          instructorID: course.instructorID,
          courseID: request.courseID,
          transactionDate: Date.now(),
          transactionAmount : w,
        });
        result.save();
        // const trans =  await transactionTable.deleteOne({ "userID":request.userID,"courseID" : request.courseID});

        res.status(200).send("refund accepted");
        }
        else{
            const request =  await requestTable.findByIdAndUpdate({ "_id": req.body.requestID },
            { $set: { "status": "rejected" } }, { new: true });
            res.status(200).send("refund rejected");
        }
      }
      catch (err) {
        console.log(err);
        res.status(400).json({error:err.message})
      }
     
  };
  
  async function viewReportedFunctions(req,res,next){
    var CurrentPage = req.query.page ? req.query.page : 1;
    try{
      var problems=await problemTable.find().skip((CurrentPage - 1) * 10).limit(10);

      var TotalCount = await problemTable.countDocuments();
      res.send({ problems: problems, TotalCount: TotalCount});
    }
    catch(error){
      console.log(error);
      res.status(400).send({error:error.message});
    }
  }

  

  
  async function markReportedProblem(req,res,next){
    try{
      var status=req.body.status;
      var problemID=req.body.problemID
      var problem=await problemTable.findById(problemID);
      if(status=="resolved"){
        problem.status="resolved";
      }
      else if(status=="pending"){
        problem.status="pending";
      }
      problem.save();
      res.send(problem);
    }
    catch(error){
      console.log(error);
    }
  }

    async function viewCourseRatings(req,res,next){
      var CurrentPage = req.query.page ? req.query.page : 1;
      try{
        var currentID=await req.body.userID;
        var currentCourseID=await req.body.courseID;
        var ratings=await CourseTable.find({
          "instructorID":currentID, "_id":currentCourseID
  
        }).select({ "_id":0,"rating":1,"review":{$slice:[(CurrentPage-1)*10,(CurrentPage-CurrentPage)+10]}})
        //const rates=[Object.values(ratings)[4]];
        //{$slice:[CurrentPage-1,CurrentPage*2]}
        res.send(ratings);
      }
      catch(error){
        res.status(400).json({error:error.message})
      }
      
  }


  async function promotion(req, res, next) {
    let queryCond = {};
    const courseID = req.body.courseID;
    var promotion = req.body.promotion;
    queryCond.promotion = req.body.promotion;
    startDate = new Date(req.body.startDate);
    queryCond.startDate = req.body.startDate;
    const dateNow = new Date();

    if(startDate<= dateNow){
      endDate = new Date(req.body.endDate);
      queryCond.endDate = endDate;
      var prop = 1 - (promotion / 100);
      try {
        queryCond.set = true;
        if(req.body.courseID){
          const x = await CourseTable.updateMany({  "_id": { $in: courseID }}, [{
            "$set": {
              promotion: queryCond,
              discountPrice: {
                $round: [{
                  $multiply: ["$discountPrice",prop]
                }, 2]
              }
            }
          }]
       , { new: true });
        res.status(200).json(x);
          
        }
        else{
          const x = await CourseTable.updateMany({}, [{
            "$set": {
              promotion: queryCond,
              discountPrice: {
                $round: [{
                  $multiply: ["$discountPrice",prop]
                }, 2]
              }
            }
          }]
       , { new: true });
        res.status(200).json(x);
        }
    
      } catch (error) {
        res.status(400).json({error:error.message})
      }
      
    }
    else{
      endDate = new Date(req.body.endDate);
      queryCond.endDate = endDate;
      queryCond.set = false;
      try {
        if(req.body.courseID){
          const x = await CourseTable.updateMany({  "_id": { $in: courseID }}, { promotion: queryCond }, { new: true });
          res.status(200).json(x);
        }
        else{
          const x = await CourseTable.updateMany( {},{ promotion: queryCond }, { new: true });
          res.status(200).json(x);
        }
       
    
      } catch (error) {
        res.status(400).json({error:error.message})
      }
  
    }
  }


  async function cancelPromotion(req,res){
    try{
      const courseID = req.body.courseID;
      if(req.body.courseID){
        var allCourses = await CourseTable.updateMany( {  "_id": { $in: courseID} ,
        "promotion.startDate": { $exists: true },"promotion.set":true},
        [
          {"$set":
          {  discountPrice: {
            $round: [{
            $divide: ["$discountPrice",
              { $subtract: [1, { $divide: ["$promotion.promotion", 100] }] }]
          }, 2]}
        , "promotion.promotion": 0 }  },
      { $unset: ["promotion.startDate","promotion.endDate","promotion.set"]}
        ]  );
  
         var allCourses2 = await CourseTable.updateOne({  "_id": { $in: courseID},
          "promotion.startDate": { $exists: true },"promotion.set":false},
          [
            {"$set":
            { "promotion.promotion": 0 }  },
        { $unset: ["promotion.startDate","promotion.endDate","promotion.set"]} ]
          );
          res.status(200).send("promotion removed");  
      }
      else{
        var allCourses = await CourseTable.updateMany( { 
        "promotion.startDate": { $exists: true },"promotion.set":true},
        [
          {"$set":
          {  discountPrice: {
            $round: [{
            $divide: ["$discountPrice",
              { $subtract: [1, { $divide: ["$promotion.promotion", 100] }] }]
          }, 2]}
        , "promotion.promotion": 0 }  },
      { $unset: ["promotion.startDate","promotion.endDate","promotion.set"]}
        ]  );
  
         var allCourses2 = await CourseTable.updateOne({
          "promotion.startDate": { $exists: true },"promotion.set":false},
          [
            {"$set":
            { "promotion.promotion": 0 }  },
        { $unset: ["promotion.startDate","promotion.endDate","promotion.set"]} ]
          );
          res.status(200).send("promotion removed");  
      }
     
  }
    catch(error){
      console.log(error);
    }
  }

  module.exports = {viewCourseRequests,grantOrRejectAccess,viewReportedFunctions,markReportedProblem,
    AcceptOrRejectRefund,promotion,cancelPromotion,viewRefundRequests}
