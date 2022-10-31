const router = require('express').Router();
const Course = require('../models/CourseSchema');
const { CourseSearch, GetPrice, GetCourse, CreateCourse } = require('../controller/CourseController')

router.get("/POP", async (req, res) => {
  var subject = "Node";
  for (var i = 1; i <= 17; i++) {
    const newCourse = new Course({
      title: "CSEN" + i,
      subtitles: [{
        header: "Introduction",
        contents: [{ title: "intro", video: "url", preview: true, duration: 120, description: "welcome" },
        { title: "test", video: "test", preview: false, duration: 150, description: "test" }],
        totalMinutes: 400
      },
      {
        header: "JavaScript",
        contents: [{ title: "Refreshing ", video: "url2", preview: true, duration: 120, description: "welcome" },
        { title: "test", video: "test", preview: false, duration: 150, description: "test" }],
        totalMinutes: 400
      }],
      summary: "Work with one of the most in-demand web development programming languages",
      price: 1200 + (i * 100),
      discountPrice: 1200 + (i * 100),
      subject: subject,
      instructorID: "6355c99c51e5736570b1d0cd",
      instructorName: "david",
      courseHours: 120,
      exercises: [{
        title: "Quiz 1",
        questions:
          [
            { question: "what about ur first oscar?", choices: ["easy", "what", "about", "it"], answer: 0, isVisible: false },
            { question: "what about ur second oscar?", choices: ["hard", "what", "about", "it"], answer: 0, isVisible: true },
          ]
        , totalGrade: 100
      },
      {
        title: "Quiz 2",
        questions:
          [
            { question: "what about ur 3rd oscar?", choices: ["easier", "what", "about", "it"], answer: 0, isVisible: false },
            { question: "what about ur 4th oscar?", choices: ["harder", "what", "about", "it"], answer: 0, isVisible: true },
          ]
        , totalGrade: 50
      },
      ]
    })

    newCourse.save();
    if (subject == "JavaScript") {
      subject = "Node";
    } else {
      subject = "JavaScript";
    }
  }
  return ("CoursePage");
})

router.post("/", async (req, res) => {

  res.send("Added " + req.body.title + " Course");

  const newCourse = {
    title: req.body.title,
    subtitle: req.body.subtitle,
    summary: req.body.summary,
    price: req.body.price,
    subject: req.body.subject,
    instructorID: req.body.instructorID,
    instructorName: req.body.instructorName
  }

  await Course.create(newCourse);
})

router.get("/getPrice", GetPrice)

router.get("/", CourseSearch);
router.get("/GetCourse", GetCourse);
router.post("/CreateCourse", CreateCourse);

module.exports = router;