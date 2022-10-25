const router = require('express').Router();
const connection = require('../config/database');
const Course = require('../models/CourseSchema');
const CourseSearch = require("../controller/CourseSearch");
const Instructor = require('../models/InstructorSchema');

router.get("/", (req, res) => {
  res.send(CourseSearch("course1", CourseTable));
})

// router.post("/", async (req, res) => {

//   res.send("Added " + req.body.title + " Course");

//   const newCourse = {
//     title: req.body.title,
//     subtitle: req.body.subtitle,
//     summary: req.body.summary,
//     price: req.body.price,
//     subject: req.body.subject,
//     instructorID: req.body.instructorID,
//     instructorName: req.body.instructorName
//   }

//   await Course.create(newCourse);
// })

router.get("/getPrice", async (req, res) => {
  var y = await Course.find({ "_id": req.query.id }).select("price");
  console.log(y);
  res.send(y);
})

router.get("/CourseSearch", async (req, res) => {

  var PriceFilter = req.query.price;
  var RatingFilter = req.query.rating;
  var SubjectFilter = req.query.subject;
  var userSearch = req.query.keyword;
  var CurrentPage = req.query.page ? req.query.page : 1;
  var queryCondition = {};
  var filterResults = null;

  if (PriceFilter == null && RatingFilter == null && SubjectFilter == null) {
    var searchResults = await Course.find({
      $or: [{ title: { $regex: userSearch, $options: "i" } },
      { subject: { $regex: userSearch, $options: "i" } },
      { instructorName: { $regex: userSearch, $options: "i" } }]
    }).skip((CurrentPage - 1) * 5).limit(5);
    res.send({ searchResults: searchResults });

  }
  else {
    if (PriceFilter != null) {
      queryCondition.price = PriceFilter;
    }
    if (RatingFilter != null) {
      queryCondition.rating = RatingFilter;  
    }
    if (SubjectFilter != null) {
      if( typeof SubjectFilter === 'string') {
        // console.log(0);
        queryCondition.subject = SubjectFilter;
      }else{
        filterResults = await Course.find({
          $or: [{ title: { $regex: userSearch, $options: "i" } },
          { subject: { $regex: userSearch, $options: "i" } },
          { instructorName: { $regex: userSearch, $options: "i" } }]
        }).
          and(queryCondition).and({ subject: { $in : SubjectFilter } })
          .skip((CurrentPage - 1) * 5).limit(5);
          // console.log(1);
        return res.send(filterResults);
        
      }
    }
    filterResults = await Course.find({
      $or: [{ title: { $regex: userSearch, $options: "i" } },
      { subject: { $regex: userSearch, $options: "i" } },
      { instructorName: { $regex: userSearch, $options: "i" } }]
    }).
      and(queryCondition)
      .skip((CurrentPage - 1) * 5).limit(5);
    res.send(filterResults);
    // console.log(0);
    
  }
})

module.exports = router;