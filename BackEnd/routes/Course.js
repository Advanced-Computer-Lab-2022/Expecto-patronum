const router = require('express').Router();
const {CourseSearch,GetPrice}= require('../controller/CourseController')

router.get("/", (req, res) => {
  res.send("Hello, Course");
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

router.get("/getPrice",GetPrice)

router.get("/CourseSearch", CourseSearch);

module.exports = router;