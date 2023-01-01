const connection = require('../config/database');
const instructorTable = require('../models/InstructorSchema');
const User = require('../models/UserSchema');
const mongoose = require('mongoose');
//const { isInstructor } = require('../middleware/RolesMiddleware');
const CourseTable = require('../models/CourseSchema');
const ExerciseTable = require('../models/ExcerciseSchema');
const { query, response } = require('express');
const transactionTable = require('../models/transactionSchema');


async function viewCourses(req, res, next) {
  var CurrentPage = req.query.page ? req.query.page : 1;
  var coursesPerPage = req.query.coursesPerPage ?req.query.coursesPerPage : 10;
  try {
    let queryCond = {};
      queryCond.instructorID = req.user._id;
    const Courses = await CourseTable.find(queryCond, {
      _id: 1,
      title: 1,
      courseHours: 1,
      price: 1,
      courseImage: 1,
      rating: 1,
      instructorName: 1,
      subject: 1,
      level: 1,
      summary: 1,
      discount: 1,
      discountPrice: 1
    }).skip((CurrentPage - 1) * coursesPerPage).limit(coursesPerPage);

    const unique = await CourseTable.distinct("subject", queryCond);
    var TotalCount = await CourseTable.countDocuments(queryCond);
    res.send({ Courses: Courses, TotalCount: TotalCount, subject: unique });
  }
  catch (err) {
    res.status(400).json({error:err.message})
  }
};

async function filterCourses(req, res, next) {
  let queryCond = {};
  var CurrentPage = req.query.page ? req.query.page : 1;
  var coursesPerPage = parseInt(req.query.coursesPerPage) ? parseInt(req.query.coursesPerPage): 5;
  if (req.query.price) {
    queryCond.discountPrice = req.query.price;
    let queryStr = JSON.stringify(queryCond.discountPrice);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|eq|ne)\b/g, match => `$${match}`);
    var Price = JSON.parse(queryStr);
    queryCond.discountPrice = Price;
  }
  if (req.query.keyword) {
    try {
      if (req.query.subject || req.query.price) {
        if (req.query.subject && req.query.price) {

          var y = await CourseTable.find(
            { "discountPrice": Price, "subject":{ "$regex": req.query.subject, "$options": "i" }, "instructorID": req.user._id, $or: [{ "title": { "$regex": req.query.keyword, "$options": "i" } }, { "subject": { "$regex": req.query.keyword, "$options": "i" } }] })
            .select({
              _id: 1,
              title: 1,
              courseHours: 1,
              price: 1,
              courseImage: 1,
              rating: 1,
              instructorName: 1,
              subject: 1,
              level: 1,
              summary: 1,
              discount: 1,
              discountPrice: 1
            }).skip((CurrentPage - 1) * coursesPerPage).limit(coursesPerPage);
          var TotalCount =  await CourseTable.countDocuments({ "discountPrice": Price, "subject": { "$regex": req.query.subject, "$options": "i" },
           "instructorID": req.user._id,
            $or: [{ "title": { "$regex": req.query.keyword, "$options": "i" } }, 
            { "subject": { "$regex": req.query.keyword, "$options": "i" } }] });
          res.send({ Courses: y, TotalCount: TotalCount });

        }
        else if (req.query.price) {
          var y = await CourseTable.find(
            { "discountPrice": Price, "instructorID": req.user._id, $or: [{ "title": { "$regex": req.query.keyword, "$options": "i" } }, { "subject": { "$regex": req.query.keyword, "$options": "i" } }] })
            .select({
              _id: 1,
              title: 1,
              courseHours: 1,
              price: 1,
              courseImage: 1,
              rating: 1,
              instructorName: 1,
              subject: 1,
              level: 1,
              summary: 1,
              discount: 1,
              discountPrice: 1
            }).skip((CurrentPage - 1) * coursesPerPage).limit(coursesPerPage);
          var TotalCount = await CourseTable.countDocuments( { "discountPrice": Price, "instructorID":req.user._id, 
          $or: [{ "title": { "$regex": req.query.keyword, "$options": "i" } },
           { "subject": { "$regex": req.query.keyword, "$options": "i" } }] });

          res.send({ Courses: y, TotalCount: TotalCount });
        }
        else{
          var y = await CourseTable.find(
            { "subject":{ "$regex": req.query.subject, "$options": "i" }, "instructorID": req.user._id, $or: [{ "title": { "$regex": req.query.keyword, "$options": "i" } }, { "subject": { "$regex": req.query.keyword, "$options": "i" } }] })
            .select({
              _id: 1,
              title: 1,
              courseHours: 1,
              price: 1,
              courseImage: 1,
              rating: 1,
              instructorName: 1,
              subject: 1,
              level: 1,
              summary: 1,
              discount: 1,
              discountPrice: 1
            }).skip((CurrentPage - 1) * coursesPerPage).limit(coursesPerPage);
          var TotalCount =await CourseTable.countDocuments( { "subject": { "$regex": req.query.subject, "$options": "i" }, "instructorID": req.user._id,
           $or: [{ "title": { "$regex": req.query.keyword, "$options": "i" } },
            { "subject": { "$regex": req.query.keyword, "$options": "i" } }] });
          res.send({ Courses: y, TotalCount: TotalCount });
        }
      }
      else {
        //req.user._id
        console.log("enter");
        console.log(req.query.keyword);
        var y = await CourseTable.find(
          { "instructorID": req.user._id, $or: [{ title: { "$regex": req.query.keyword, "$options": 'i' } }, { subject: { "$regex": req.query.keyword, "$options": 'i' } }] })
          .select({
            _id: 1,
            title: 1,
            courseHours: 1,
            price: 1,
            courseImage: 1,
            rating: 1,
            instructorName: 1,
            subject: 1,
            level: 1,
            summary: 1,
            discount: 1,
            discountPrice: 1
          }).skip((CurrentPage - 1) * coursesPerPage).limit(coursesPerPage);
          console.log(y);
        var TotalCount = await CourseTable.countDocuments( { "instructorID": req.user._id,
         $or: [{ "title": { "$regex": req.query.keyword, "$options": "i" } }, 
         { "subject": { "$regex": req.query.keyword, "$options": "i" } }] });

        res.send({ Courses: y, TotalCount: TotalCount });
        return;
      }
    } catch (error) {
      res.status(400).json({error:error.message})
    }

  }
  else {
    try {
        queryCond.instructorID = req.user._id;
        console.log(req.user._id);
      if (req.query.subject) {
        queryCond.subject ={ "$regex": req.query.subject, "$options": "i" };
      }
      var y = await CourseTable.find(queryCond)
        .select({
          _id: 1,
          title: 1,
          courseHours: 1,
          price: 1,
          courseImage: 1,
          rating: 1,
          instructorName: 1,
          subject: 1,
          level: 1,
          summary: 1,
          discount: 1,
          discountPrice: 1
        }).skip((CurrentPage - 1) * coursesPerPage).limit(coursesPerPage);
        console.log(req.user);
        console.log(y);

      var TotalCount = await CourseTable.countDocuments(queryCond);
      res.send({ Courses: y, TotalCount: TotalCount });
    } catch (error) {
      res.status(400).json({error:error.message})
    }
  }
};

async function addCourse(req, res, next) {



  try {
    var exists=await CourseTable.findOne({"title":req.body.title});
    if(exists){
      res.status(400).send("Course title already used");
    }
    else{
      var x = await User.find({ "_id": req.user._id }, { firstname: 1, lastname: 1, _id: 0 });
    var y = Object.values(x)[0];
    console.log(y);
    var name = y.firstname + " " + y.lastname;
    console.log(name);

    const newCourse = new CourseTable({
    instructorID: req.user._id,
    title: req.body.title,
    summary: req.body.summary,
    subtitles: req.body.subtitles,
    subject: req.body.subject,
    price: req.body.price,
    skills: req.body.skills,
    level: req.body.level,
    courseHours: req.body.courseHours,
    //exercises: req.body.exercises,
    courseVideo : req.body.courseVideo,
    //rating: req.body.rating,
    instructorName: name,
    discountPrice: req.body.price,
    //review:req.body.review,
    courseImage:req.body.courseImage
    });  
    newCourse.save();
   // res.send(newCourse);
    console.log("course added succsessfully");
    if(req.body.exercises){
    var z = Object.values(newCourse)[0] ;
    console.log(z._id);
    let exercises = req.body.exercises;
    for(var i = 0;i<exercises.length;i++){
      var q =  exercises[i] ;
      q.courseID = z._id;
      const newExercise = new ExerciseTable(q);
      await newExercise.save();
    }
    var courseid = z._id;
    const exe = await ExerciseTable.find({courseID:courseid}).select({"_id":1,"subtitleName":1,"exerciseTitle":1});
    console.log(exe);
    //var z = Object.values(exe)[0] ;
     for(var i=0;i<exe.length;i++){
       var z = exe[i] ;
       if(z.subtitleName){
        await CourseTable.updateOne({ "_id": courseid,"subtitles.header": z.subtitleName },
          { "$push": { "subtitles.$.exercise" :{
            "exerciseID":  z._id,
            "exerciseName": z.exerciseTitle
          }}}
          );
      }
      else{
        await CourseTable.updateOne({ "_id": courseid},
        { "$set": { "finalExam" : z._id}}
        );
      }
      
     }
    }
    res.send("Course Added");
  }

  } catch (err) {
    res.status(400).json({error:err.message})
  };
};

async function discount(req, res, next) {
  let queryCond = {};
  const courseID = req.body.courseID;
  var discount = req.body.discount;
  queryCond.discount = req.body.discount;
  startDate = new Date(req.body.startDate);
  queryCond.startDate = req.body.startDate;
  const dateNow = new Date();
  //queryCond.duration = req.body.duration;
  if(startDate<= dateNow){
    endDate = new Date(req.body.endDate);
    queryCond.endDate = endDate;
    discount = 1 - (discount / 100);
    try {
      queryCond.set = true;
      const y = await CourseTable.find({ "_id": courseID }).select({discountPrice:1, price: 1 });
      var z = Object.values(y)[0];
      var discountPrice = (z.discountPrice * discount);
  
      discountPrice = discountPrice.toFixed(2);
      const x = await CourseTable.findByIdAndUpdate({ "_id": courseID }, { discount: queryCond,discountPrice : discountPrice  }, { new: true });
      res.status(200).json(x);
  
    } catch (error) {
      res.status(400).json({error:error.message})
    }
    
  }else{
    endDate = new Date(req.body.endDate);
    queryCond.endDate = endDate;
    queryCond.set = false;
    try {
      const x = await CourseTable.findByIdAndUpdate({ "_id": courseID }, { discount: queryCond }, { new: true });
      res.status(200).json(x);
  
    } catch (error) {
      res.status(400).json({error:error.message})
    }

  }
}


  
  async function viewCourseRatings(req,res,next){
    var CurrentPage = req.query.page ? req.query.page : 1;
    try{
      var currentID= req.user._id;
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

async function updateBio(req,res){
      try{var currentId= req.user._id;
        var currentBio=req.body.newBio;
        var updatedBio=await User.findByIdAndUpdate(currentId,{"biography":currentBio});
        res.send(updatedBio);
      }
        catch(error){
          console.log(error);
        }
      
}

    async function cancelDiscount(req,res){
      try{
        var allCourses = await CourseTable.updateOne( {"_id" : req.body.courseId,
        "discount.startDate": { $exists: true },"discount.set":true},
        [
          {"$set":
          {  discountPrice: {
            $round: [{
            $divide: ["$discountPrice",
              { $subtract: [1, { $divide: ["$discount.discount", 100] }] }]
          }, 2]}
        , "discount.discount": 0 }  },

      { $unset: ["discount.startDate","discount.endDate","discount.set"]}
        ]
        );
       
          var allCourses2 = await CourseTable.updateOne( {"_id" : req.body.courseId,
          "discount.startDate": { $exists: true },"discount.set":false},
          [
            {"$set":
            { "discount.discount": 0 }  },
        { $unset: ["discount.startDate","discount.endDate","discount.set"]} ]
          );

          if(allCourses2.nModified==1 || allCourses.nModified==1  ){
            res.status(200).send("discount removed");
          }
            else{
              res.status(200).send("no discount"); 
            }
    }
      catch(error){
        console.log(error);
      }
    }

    
    
    async function viewProfile(req,res,next){
      try{
        var instructor=await User.find({"_id":req.user._id},{
          username:1,
          instructorRating: 1,
          biography: 1,
          _id: 1,
          gender:1,
          firstname: 1,
          lastname: 1,
          instructorReview: { "$slice": 3 },
          email: 1,
        });

        res.status(200).send(instructor);
      }
      catch(error){
        console.log(error);
        res.status(400).send({error:error.message});
      }
    }

    async function filterByRatings(req,res){
      var CurrentPage = req.query.page ? req.query.page : 1;
    try{
      var currentID=await req.user._id;
      var stars=req.body.rating;
      var currentCourseID=await req.body.courseID;
      var ratings=await CourseTable.findOne({
        "instructorID":currentID, "_id":currentCourseID,"review.rating":stars

      }).select({ "_id":0,"review":{$slice:[(CurrentPage-1)*10,(CurrentPage-CurrentPage)+10]}})
      var x=ratings.review;
      var y=[];
      for(let i=0;i<x.length;i++){
        if(x[i].rating==stars){
          y.push(x[i]);
        }
      }
      //const rates=[Object.values(ratings)[4]];
      //{$slice:[(CurrentPage-1)*10,(CurrentPage-CurrentPage)+7]}
      //{$elemMatch : {rating:stars}}
      //{$slice:[CurrentPage-1,CurrentPage*2]}
      //res.send(ratings.review);
      //console.log(stars);
      res.send(y);
    }
    catch(error){
      res.status(400).json({error:error.message})
    }
    }

async function viewInstructorRatingsAndReviews(req, res) {

  try {
    const ratings = await User.findById({ _id: req.user._id }).select({ instructorRating: 1, instructorReview: 1});
    
    res.send(ratings);
    
  } catch(error) {
    console.log(error);
  }

}
async function testingAll(req,res){
  var x=1;
  try{
    var whatever=await CourseTable.findOne({"_id":"637bbb38ae65da68c4e57726","review.rating":x}).select({"review.rating":1,"_id":0});
    
    res.send(whatever);
  }
  catch(error){
    console.log(error);
  }
}

const amount = [{"transactionDate":"2022-11-03","transactionAmount":158},
{"transactionDate":"2022-05-31","transactionAmount":126},
{"transactionDate":"2022-10-26","transactionAmount":248},
{"transactionDate":"2022-11-23","transactionAmount":28},
{"transactionDate":"2022-09-26","transactionAmount":222},
{"transactionDate":"2022-01-05","transactionAmount":60},
{"transactionDate":"2022-09-27","transactionAmount":119},
{"transactionDate":"2022-07-03","transactionAmount":80},
{"transactionDate":"2022-08-16","transactionAmount":205},
{"transactionDate":"2022-11-10","transactionAmount":63},
{"transactionDate":"2022-06-08","transactionAmount":249},
{"transactionDate":"2022-06-10","transactionAmount":249},
{"transactionDate":"2022-07-11","transactionAmount":160},
{"transactionDate":"2022-09-06","transactionAmount":154},
{"transactionDate":"2022-05-13","transactionAmount":289},
{"transactionDate":"2022-07-04","transactionAmount":77},
{"transactionDate":"2022-08-24","transactionAmount":196},
{"transactionDate":"2022-02-03","transactionAmount":280},
{"transactionDate":"2022-05-15","transactionAmount":257},
{"transactionDate":"2022-05-08","transactionAmount":204}]

async function generateAmountOwed(req, res) {
  for(var i = 0; i < amount.length; i++) {
    transactionTable.create({
      instructorID: '63877fb65c8dac5284aaa3c2',
      transactionDate: amount[i].transactionDate,
      transactionAmount: amount[i].transactionAmount,
    });
  }

  res.send("success");
}

async function viewAmountOwned(req, res, next) {
  try {

    let idToSearch = mongoose.Types.ObjectId(req.user._id);
    const amount = await transactionTable.aggregate(
    [
      { "$match":{ "instructorID": idToSearch}},
      { 
        $group:
          {
            _id: { month: { $month: "$transactionDate"}, year: { $year: "$transactionDate" } },
            totalAmount: { $sum: { $multiply: [ "$transactionAmount", 1 ] } },
            count: { $sum: 1 }
          }
      },
      
    ]).sort({"_id":1});
  
    res.send({ amount: amount });

  }
  catch (err) {
    res.status(400).json({error:err.message})
  }
};

async function searchCourses(req, res) {
  res.send(await CourseTable.find({ instructorID: req.user._id }).select({ title: 1 }));
}

async function viewInstructorPopularCourses(req, res, next) {
  var CurrentPage = req.query.page ? req.query.page : 1;
  var coursesPerPage = req.query.coursesPerPage?req.query.coursesPerPage:10;
  try {
    const Courses = await Course.find({instructorID:req.user._id}, {
      _id: 1,
      title: 1,
      courseHours: 1,
      price: 1,
      courseImage: 1,
      rating: 1,
      instructorName: 1,
      subject: 1,
      level: 1,
      summary: 1,
      discount: 1,
      discountPrice: 1,
      purchases:1
    }).sort({purchases:-1}).skip(0).limit(15);

    res.status(200).send({ Courses: Courses});

  }
  catch (err) {
    res.status(400).json({error:err.message})
  }
};



module.exports = { 
  viewCourses, filterCourses, addCourse, discount, viewCourseRatings, 
  updateBio, testingAll, viewProfile, cancelDiscount, viewInstructorRatingsAndReviews,
  filterByRatings, searchCourses,viewAmountOwned,viewInstructorPopularCourses, generateAmountOwed
};
