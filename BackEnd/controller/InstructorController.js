const connection = require('../config/database');
const instructorTable = require('../models/InstructorSchema');
const User = require('../models/UserSchema');
//const { isInstructor } = require('../middleware/RolesMiddleware');
const CourseTable = require('../models/CourseSchema');
const ExerciseTable = require('../models/ExcerciseSchema');
const { query, response } = require('express');



async function viewCourses(req, res, next) {
  var CurrentPage = req.query.page ? req.query.page : 1;
  try {
    let queryCond = {};
    if (req.query.instructorID) {
      queryCond.instructorID = req.query.instructorID;
    }
    const Courses = await CourseTable.find(queryCond, {
      _id: 1,
      title: 1,
      courseHours: 1,
      price: 1,
      courseImage: 1,
      rating: 1,
      instructorName: 1,
      subject: 1,
      summary: 1,
      discount: 1,
      discountPrice: 1
    }).skip((CurrentPage - 1) * 5).limit(5);

    const unique = await CourseTable.distinct("subject", queryCond);
    var TotalCount = await CourseTable.countDocuments(queryCond);
    //var searchResults = Courses.slice((CurrentPage - 1) * 5, CurrentPage * 5);
    res.send({ Courses: Courses, TotalCount: TotalCount, subject: unique });

  }
  catch (err) {
    res.status(400).json({error:err.message})
  }
};


async function filterCourses(req, res, next) {
  let queryCond = {};
  var CurrentPage = req.query.page ? req.query.page : 1;
  var coursesPerPage = req.query.coursesPerPage? coursesPerPage:5;
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
            { "discountPrice": Price, "subject": req.query.subject, "instructorID": req.query.instructorID, $or: [{ "title": { "$regex": req.query.keyword, "$options": "i" } }, { "subject": { "$regex": req.query.keyword, "$options": "i" } }] })
            .select({
              _id: 1,
              title: 1,
              courseHours: 1,
              price: 1,
              courseImage: 1,
              rating: 1,
              instructorName: 1,
              subject: 1,
              summary: 1,
              discount: 1,
              discountPrice: 1
            }).skip((CurrentPage - 1) * coursesPerPage).limit(coursesPerPage);
          var TotalCount =  await CourseTable.countDocuments({ "discountPrice": Price, "subject": req.query.subject,
           "instructorID": req.query.instructorID,
            $or: [{ "title": { "$regex": req.query.keyword, "$options": "i" } }, 
            { "subject": { "$regex": req.query.keyword, "$options": "i" } }] });
          res.send({ Courses: y, TotalCount: TotalCount });

        }
        else if (req.query.price) {
          var y = await CourseTable.find(
            { "discountPrice": Price, "instructorID": req.query.instructorID, $or: [{ "title": { "$regex": req.query.keyword, "$options": "i" } }, { "subject": { "$regex": req.query.keyword, "$options": "i" } }] })
            .select({
              _id: 1,
              title: 1,
              courseHours: 1,
              price: 1,
              courseImage: 1,
              rating: 1,
              instructorName: 1,
              subject: 1,
              summary: 1,
              discount: 1,
              discountPrice: 1
            }).skip((CurrentPage - 1) * coursesPerPage).limit(coursesPerPage);
          var TotalCount = await CourseTable.countDocuments( { "discountPrice": Price, "instructorID": req.query.instructorID, 
          $or: [{ "title": { "$regex": req.query.keyword, "$options": "i" } },
           { "subject": { "$regex": req.query.keyword, "$options": "i" } }] });

          res.send({ Courses: y, TotalCount: TotalCount });
        }
        else {
          var y = await CourseTable.find(
            { "subject": req.query.subject, "instructorID": req.query.instructorID, $or: [{ "title": { "$regex": req.query.keyword, "$options": "i" } }, { "subject": { "$regex": req.query.keyword, "$options": "i" } }] })
            .select({
              _id: 1,
              title: 1,
              courseHours: 1,
              price: 1,
              courseImage: 1,
              rating: 1,
              instructorName: 1,
              subject: 1,
              summary: 1,
              discount: 1,
              discountPrice: 1
            }).skip((CurrentPage - 1) * coursesPerPage).limit(coursesPerPage);
          var TotalCount =await CourseTable.countDocuments( { "subject": req.query.subject, "instructorID": req.query.instructorID,
           $or: [{ "title": { "$regex": req.query.keyword, "$options": "i" } },
            { "subject": { "$regex": req.query.keyword, "$options": "i" } }] });
          res.send({ Courses: y, TotalCount: TotalCount });
        }
      }
      else {
        var y = await CourseTable.find(
          { "instructorID": req.query.instructorID, $or: [{ "title": { "$regex": req.query.keyword, "$options": "i" } }, { "subject": { "$regex": req.query.keyword, "$options": "i" } }] })
          .select({
            _id: 1,
            title: 1,
            courseHours: 1,
            price: 1,
            courseImage: 1,
            rating: 1,
            instructorName: 1,
            subject: 1,
            summary: 1,
            discount: 1,
            discountPrice: 1
          }).skip((CurrentPage - 1) * coursesPerPage).limit(coursesPerPage);

        var TotalCount = await CourseTable.countDocuments( { "instructorID": req.query.instructorID,
         $or: [{ "title": { "$regex": req.query.keyword, "$options": "i" } }, 
         { "subject": { "$regex": req.query.keyword, "$options": "i" } }] });

        res.send({ Courses: y, TotalCount: TotalCount });
      }
    } catch (error) {
      res.status(400).json({error:error.message})
    }

  }
  else {
    try {
      if (req.query.instructorID) {
        queryCond.instructorID = req.query.instructorID;
      }
      if (req.query.subject) {
        queryCond.subject = req.query.subject;
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
          summary: 1,
          discount: 1,
          discountPrice: 1
        }).skip((CurrentPage - 1) * coursesPerPage).limit(coursesPerPage);


      var TotalCount = await CourseTable.countDocuments(queryCond);
      res.send({ Courses: y, TotalCount: TotalCount });
    } catch (error) {
      res.status(400).json({error:error.message})
    }
  }
};



async function addCourse(req, res, next) {

  var x = await User.find({ "_id": req.body.instructorID }, { firstname: 1, lastname: 1, _id: 0 });
  var y = Object.values(x)[0];
  console.log(y);
  var name = y.firstname + " " + y.lastname;
  console.log(name);
  //  const subtitles = req.body.subtitles;
  //  console.log(subtitles);

  //  var sum = 0;
  //  var sum1 = [];
  //  var tempsum = 0;
  //  const sum2 = [];
  // for(var i =0;i< subtitles.length;i++){
  //   var z = Object.values(subtitles)[i] ;
  //   for(var j =0;j< z.contents.length;j++){
  //     var w = Object.values(z.contents)[j] ;
  //     sum1.push(w.duration);
  //     console.log(w);
  //   }
  //   console.log(sum1);
  //   for(var a = 0 ;a< sum1.length;a++){
  //     var intvalue = Math.floor(a);
  //     tempsum = tempsum + Object.values(sum1)[a];
  //     if(a == sum1.length-1){
  //       sum2.push(tempsum);
  //     }
  //   }
  //   tempsum=0;
  //   console.log(sum1);
  //   sum1= [];
  //   sum = sum + z.totalMinutes;
  // }
  // console.log(sum);
  // console.log(sum2);

  const newCourse = new CourseTable({
    instructorID: req.body.instructorID,
    title: req.body.title,
    summary: req.body.summary,
    subtitles: req.body.subtitles,
    subject: req.body.subject,
    price: req.body.price,
    skills: req.body.skills,
    level: req.body.level,
    courseHours: req.body.courseHours,
    //exercises: req.body.exercises,
    rating: req.body.rating,
    instructorName: name,
    discountPrice: req.body.price,
    review:req.body.review,
    courseImage:req.body.courseImage
  });

  try {
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
    const exe = await ExerciseTable.find({courseID:courseid}).select({"_id":1,"subtitleName":1});
    console.log(exe);
    //var z = Object.values(exe)[0] ;
     for(var i=0;i<exe.length;i++){
       var z = exe[i] ;
       if(z.subtitleName){
        await CourseTable.updateOne({ "_id": courseid,"subtitles.header": z.subtitleName },
          { "$push": { "subtitles.$.exercise" : z._id}}
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

  } catch (err) {
    res.status(400).json({error:err.message})
  };
};

async function discount(req, res, next) {
  let queryCond = {};
  const courseID = req.body.courseID;
  var discount = req.body.discount;
  queryCond.discount = req.body.discount;
  queryCond.duration = req.body.duration;
  if(req.body.startDate){
    startDate = new Date(req.body.startDate);
    queryCond.startDate = req.body.startDate;
  }else{
    startDate = new Date();
    queryCond.startDate = startDate;
  }
  endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + req.body.duration);
  queryCond.endDate = endDate;
  discount = 1 - (discount / 100);
  try {
    const y = await CourseTable.find({ "_id": courseID }).select({ price: 1 });
    var z = Object.values(y)[0];
    var discountPrice = (z.price * discount);

    discountPrice = discountPrice.toFixed(2);
    const x = await CourseTable.findByIdAndUpdate({ "_id": courseID }, { discount: queryCond, discountPrice: discountPrice }, { new: true });
    res.status(200).json(x);

  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

  
  async function viewCourseRatings(req,res,next){
    try{
      var currentID=await req.body.userID;
      var currentCourseID=await req.body.courseID;
      var ratings=await CourseTable.find({
        "instructorID":currentID, "_id":currentCourseID

      }).select({ "title": 1, "summary": 1,"rating":1,"review":1});
      //const rates=[Object.values(ratings)[4]];
      res.send(ratings);
    }
    catch(error){
      res.status(400).json({error:error.message})
    }
    
  }

  async function testAll(req,res){
    try{
      var test=await CourseTable.find();
      res.send(test);
    }
    catch(error){
      console.log(error);
    }
    
  }






module.exports = { viewCourses, filterCourses, addCourse, discount, viewCourseRatings,testAll};