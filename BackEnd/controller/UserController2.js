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
const transactionTable = require('../models/transactionSchema');

async function SelectExercise(req, res, next) {
  try {
    const x = await ExerciseTable.findOne({ "_id": req.body.exerciseID }, {
      exerciseTitle: 1,
      totalGrade: 1,
      _id: 1,
      averageGrade: { $avg: "$averageMark" }
    });
    let q = {};
    const course = await CourseTable.findOne({ _id: req.body.courseID }, { _id: 1, instructorID: 1 });
    if (course.instructorID == req.body.userID) {
      res.status(200).send(x);
      return;
    }
    else {
      var y = await User.findOne({ "_id": req.body.userID, "purchasedCourses.excercises.excerciseID": req.body.exerciseID },
        { purchasedCourses: { $elemMatch: { courseID: req.body.courseID } } }
      );
      if (y) {
        var exe = y.purchasedCourses[0].excercises;
        for (var i = 0; i < exe.length; i++) {
          if (exe[i].excerciseID == req.body.exerciseID) {
            console.log(exe[i]);
            if (exe[i].grade || exe[i].grade == 0) {
              q.yourGrade = exe[i].grade;
            }
            break;
          };
        }
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
    var x = await ExerciseTable.findOne({ "_id": req.query.exerciseID }, {
      exerciseTitle: 1,
      totalGrade: 1,
      _id: 1,
      questions: 1
    });
    var y = await User.findOne({ "_id": req.query.userID, "purchasedCourses.excercises.excerciseID": req.query.exerciseID },
      { purchasedCourses: { $elemMatch: { courseID: req.query.courseID } } }
    );
    console.log(y);
    let q = {};
    if (y) {
      var exe = y.purchasedCourses[0].excercises;
      for (var i = 0; i < exe.length; i++) {
        if (exe[i].excerciseID == req.query.exerciseID) {
          if (exe[i].grade) {
            q.yourGrade = exe[i].grade;
          }
          q.yourAnswers = exe[i].exercisesAnswers.answer;
          break;
        };
      }
      q.totalGrade = y.grade;
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

async function requestCourse(req, res, next) {
  var x = await User.findOne({ "_id": req.body.userID }, { purchasedCourses: { $elemMatch: { courseID: req.body.courseID } }, role: 1, _id: 1, username: 1 });
  var y = await CourseTable.findOne({ "_id": req.body.courseID }, { _id: 1, title: 1 });
  if (req.body.request == "RequestCourse") {
    if (x.role == "CorporateTrainee") {
      const date = new Date();
      const newRequest = new requestTable({
        type: 'RequestCourse',
        userID: req.body.userID,
        username: x.username,
        courseID: req.body.courseID,
        courseTitle: y.title,
        startDate: date,
        body: req.body.body
      });
      try {
        newRequest.save();
        res.status(200).send(newRequest);
      } catch (err) {
        res.status(400).json({ error: err.message })
      };
    }

  }
  else {
    var xx = await User.findOne({ "_id": req.body.userID }, { purchasedCourses: { $elemMatch: { courseID: req.body.courseID } }, role: 1, _id: 1, username: 1 });
    var prog = xx.purchasedCourses[0].progress;
    if (prog <= 49) {
      const date = new Date();
      const newRequest = new requestTable({
        type: 'Refund',
        userID: req.body.userID,
        username: x.username,
        courseID: req.body.courseID,
        courseTitle: y.title,
        startDate: date,
        body: req.body.body,
        progress: prog
      });
      try {
        newRequest.save();
        res.status(200).send(newRequest);
      } catch (err) {
        res.status(400).json({ error: err.message })
      };
    }
    else {
      res.status(200).send("your have watched more than 50% of the course")
    }
  }
};

async function viewPreviousRequests(req, res, next) {
  try {
    var userID = req.body.userID;
    var request = await requestTable.find({ "userID": userID }).select({ "type": 1, "body": 1, "startDate": 1, "status": 1, "courseTitle": 1 });
    res.send(request);
  }
  catch (error) {
    console.log(error);
  }
}


async function reportProblem(req, res, next) {
  var y = await CourseTable.findOne({ "_id": req.body.courseID }, { title: 1 });

  try {
    const result = await problemTable.create({
      type: req.body.type,
      userID: req.body.userID,
      //status: req.body.status,
      body: req.body.body,
      courseID: req.body.courseID,
      courseTitle: y.title,
      startDate: Date.now(),
      //comment: req.body.comment,
    });
    result.save();
    res.status(200).send(result);
  }
  catch (error) {
    console.log(error);
  }
}

async function viewPreviousReports(req, res, next) {
  try {
    var userID = req.body.userID;
    var problems = await problemTable.find({ "userID": userID }).select({ "type": 1, "body": 1, "startDate": 1, "status": 1, "courseTitle": 1, comment: 1 });
    res.send(problems);
  }
  catch (error) {
    console.log(error);
  }
}

async function followUpOnProblem(req, res, next) {
  try {
    // var userID = req.body.userID;
    var problemID = req.body.problemID;
    var followUp = req.body.followUp
    var problem = await problemTable.findOne({ "_id": problemID });
    problem.comment.push(followUp);
    problem.save();
    res.send(problem);
  }
  catch (error) {
    console.log(error);
  }


}


async function createTransaction(req, res, next) {
  try {
    const x = await CourseTable.findOne({ _id: req.body.courseID });
    const result = await transactionTable.create({
      userID: req.body.userID,
      instructorID: x.instructorID,
      courseID: req.body.courseID,
      transactionDate: req.body.transactionDate,
      //transactionDate: Date.now(),
      transactionAmount: req.body.transactionAmount,
    });
    result.save();
    res.status(200).send(result);
  }
  catch (error) {
    console.log(error);
  }
}

async function watchVideo(req, res) {
  try {
    var user_id = req.body.userID;
    var course_id = req.body.courseID;
    var course = await CourseTable.findById(course_id, { _id: 1, courseHours: 1 });
    console.log(course);
    var courseTotalMin = (course.courseHours) * 60;
    console.log(courseTotalMin);
    var url = req.body.videoURL;
    var time = req.body.videotime;

    var exists = await User.findOne({ "purchasedCourses.watchedVideos": url, "_id": user_id })
    console.log(exists);


    //var user=await User.findById(user_id);
    if (exists) {
      var yy = await User.findOne({ "_id": user_id },
        { _id: 1, purchasedCourses: { $elemMatch: { courseID: course_id } } }
      );
      console.log(yy.purchasedCourses)
      var x = yy.purchasedCourses[0].progress;
      console.log(yy.purchasedCourses[0].watchedVideos)
      res.status(200).send({ progress: x, watchedVideos: yy.purchasedCourses[0].watchedVideos });
    }
    else {
      const re = await User.updateOne({ "_id": user_id, "purchasedCourses.courseID": course_id },
        {
          "$push": { "purchasedCourses.$.watchedVideos": url },
          "$inc": { "purchasedCourses.$.watchedMinutes": time }
        },
      );
      var y = await User.findOne({ "_id": user_id },
        { _id: 1, purchasedCourses: { $elemMatch: { courseID: course_id } } }
      );

      var progress = (((y.purchasedCourses[0].watchedMinutes) / courseTotalMin) * 100);
      var prog = progress.toFixed(0);

      const re2 = await User.updateOne({ "_id": user_id, "purchasedCourses.courseID": course_id },
        {
          "$set": { "purchasedCourses.$.progress": prog }
        },
      );

      var yy = await User.findOne({ "_id": user_id },
        { _id: 1, purchasedCourses: { $elemMatch: { courseID: course_id } } }
      );
      console.log(yy.purchasedCourses)
      var x = yy.purchasedCourses[0].progress;

      res.status(200).send({ progress: x, watchedVideos: yy.purchasedCourses[0].watchedVideos });
    }
  }
  catch (error) {
    console.log(error);
  }

};





async function addNote(req, res, next) {
  var courseID = req.body.courseID;
  var userID = req.body.userID;
  var content = req.body.contentID;
  var subtitle = req.body.subTitleID;
  var timestamp = req.body.timestamp;
  var note = req.body.note;
  var subtitleName = req.body.subtitleName;
  var contentName = req.body.contentName;
  var subtitleIndex = req.body.subtitleIndex;
  var contentIndex = req.body.contentIndex;
  // const fullNote = { contentID: content, subtitleID: subtitle, timestamp: timestamp, note: note }
  // let purchasedCourses = [];
  try {
    const updatedUser = await User.findOneAndUpdate(
      { "_id": userID, "purchasedCourses.courseID": courseID },
      {
        "$push": {
          "purchasedCourses.$.notes":
            { "contentID": content, subtitleID: subtitle, "timestamp": timestamp, "note": note, "subtitleName": subtitleName, "contentName": contentName, "subtitleIndex": subtitleIndex, "contentIndex": contentIndex }
        }
      },
      { new: true, useFindAndModify: false }
    );

    const lastAddedNote = updatedUser.purchasedCourses.find(purchasedCourse => purchasedCourse.courseID == courseID).notes[updatedUser.purchasedCourses.find(purchasedCourse => purchasedCourse.courseID == courseID).notes.length - 1];
    res.send(lastAddedNote);
    // 

    //i want to console.log the purchasedCourses array



    // y.purchasedCourses[0].notes.push(fullNote)
    // y.save;
    // res.send(y)
  }
  catch (error) {
    console.log(error);
  }

}

async function viewNotes(req, res, next) {
  try {
    var courseID = req.body.courseID;
    var userID = req.body.userID;
    var y = await User.findOne({ "_id": userID },
      { _id: 1, purchasedCourses: { $elemMatch: { courseID: courseID } } }
    );
    res.send(y.purchasedCourses[0].notes);
  }
  catch (error) {
    console.log(error);
  }

}
async function DeleteNote(req, res, next) {
  try {
    const userID = req.body.userID;
    const courseID = req.body.courseID;
    const noteID = req.body.noteID;
    // Find the user in the database
    const user = await User.findOne({ _id: userID });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Find the course in the purchasedCourses array of the user
    const courseIndex = user.purchasedCourses.findIndex(
      (course) => {
        return course.courseID.toString() == courseID;
      }
    );

    console.log(user.purchasedCourses.findIndex(
      (course) => {
        course.courseID.toString() == courseID;
      }
    )
    );

    if (courseIndex === -1) {
      return res.status(404).send({ error: "Course not found" });
    }
    const course = user.purchasedCourses[courseIndex];

    // Find the note in the notes array of the course
    const noteIndex = course.notes.findIndex(
      (note) => note._id.toString() == noteID
    );
    if (noteIndex === -1) {
      return res.status(404).send({ error: "Note not found" });
    }

    // Remove the note from the notes array
    course.notes.splice(noteIndex, 1);

    // Save the updated course to the database
    await user.save();

    res.send({ message: "Note deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error deleting note" });
  }
}

async function EditNote(req, res, next) {
  try {
    const userID = req.body.userID;
    const courseID = req.body.courseID;
    const noteID = req.body.noteID;
    const newText = req.body.text;

    // Find the user in the database
    const user = await User.findOne({ _id: userID });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Find the course in the purchasedCourses array of the user
    const courseIndex = user.purchasedCourses.findIndex(
      (course) => course.courseID.toString() === courseID
    );
    if (courseIndex === -1) {
      return res.status(404).send({ error: "Course not found" });
    }
    const course = user.purchasedCourses[courseIndex];

    // Find the note in the notes array of the course
    const noteIndex = course.notes.findIndex(
      (note) => note._id.toString() === noteID
    );
    if (noteIndex === -1) {
      return res.status(404).send({ error: "Note not found" });
    }
    const note = course.notes[noteIndex];

    // Update the text field of the note
    note.note = newText;

    console.log(note)
    // Save the updated course to the database
    await user.save();

    res.send({ message: "Note edited successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error editing note" });
  }
}


async function filterNotes(req, res, next) {
  try {
    var contentID = req.body.contentID;
    var courseID = req.body.courseID;
    var userID = req.body.userID;
    var result = [];
    var y = await User.findOne({ "_id": userID },
      { _id: 1, purchasedCourses: { $elemMatch: { courseID: courseID } } }
    );
    for (let i = 0; i < y.purchasedCourses[0].notes.length; i++) {
      if (y.purchasedCourses[0].notes[i].contentID == contentID) {
        result.push(y.purchasedCourses[0].notes[i]);
      }
    }
    res.send(result);
  }
  catch (error) {
    console.log(error);
  }

}

async function lastWatched(req, res, next) {
  try {
    const exists = await User.updateOne({ "_id": req.body.userID, "purchasedCourses.courseID": req.body.courseID },
      { $set: { "purchasedCourses.$.lastWatched": req.body.contentID } });
    res.status(200).send("changed");
  } catch (error) {
    console.log(error);
    res.send({ error: error.message });
  }
}




module.exports = {
  SelectExercise, viewAnswer, requestCourse, reportProblem, viewPreviousReports, viewPreviousRequests,
  followUpOnProblem, watchVideo, addNote, viewNotes, DeleteNote, EditNote, filterNotes, createTransaction, lastWatched
}
