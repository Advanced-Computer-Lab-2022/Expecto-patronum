const CheckUserType = require("../lib/CheckRoleUtils");
const { genPassword, validPassword } = require("../lib/passwordUtils");
const { default: mongoose } = require('mongoose');
const CourseTable = require('../models/CourseSchema');
const User = require('../models/UserSchema');
const passport = require('passport');
const countryToCurrency = require('country-to-currency');
const CC = require('currency-converter-lt');
const { CreateToken } = require("../lib/CreateToken");
const { MailValidate } = require("../lib/MailValidation");
const { VerifyTokenDate } = require("../lib/VerfiyTokenDate");
const { Passport } = require("passport");
const ExerciseTable = require('../models/ExcerciseSchema');
const requestTable = require('../models/RequestSchema');
const transactionTable = require('../models/transactionSchema');

async function register(req, res) {
  console.log("req.body.password");
  const saltHash = genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  var exists1 = await User.findOne({ "email": req.body.email });

  var exists2 = await User.findOne({ "username": req.body.username });
  if (exists1 || exists2) {
    if (exists1 && exists2) {
      res.status(400).send("username and email already used");
    }
    else if (exists1) {
      res.status(400).send("email already used");
    }
    else {
      res.status(400).send("username already used");
    }
  }
  else {
    const newUser = new User({
      username: req.body.username,
      hash: hash,
      salt: salt,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      role: req.body.role
    });


    newUser.save((err, newUser) => {
      if (err) {
        console.log(err);

      }
      else {
        let token = CreateToken({ id: newUser._id, email: newUser.email });
        MailValidate(newUser.email, "http://localhost:5000/user/MailVerify", token);
        res.send("Please verify your email");
      }

    })
  }

};


function Logout(req, res) {
  req.logout((err) => { if (err) console.log(`the Error is ${err}`) });
  res.send("Logged out");


}

async function ViewAll(req, res) {
  try {
    var allCourses = await CourseTable.find().select({
      "title": 1, "courseHours": 1, "rating": 1
    });
    res.send(allCourses);
  }
  catch (error) {

  }


}

async function getRate(req, res, next) {
  const country = req.query.country;
  console.log("country " + country);
  const curr = countryToCurrency[country];
  let currencyConverter = new CC({ from: "USD", to: curr, amount: 1 });
  var rate = 1;
  await currencyConverter.rates().then((response) => {
    rate = response;
  });
  console.log("rate " + rate);
  try {
    res.send({ rate: rate, curr: curr });
  } catch (error) {
    console.log(error);
  }
};

function forgetPassword(req, res, next) {
  let userMail = req.body.email;
  User.findOne({ email: { $regex: userMail, $options: 'i' } },
    (err, user) => {
      if (err) {
        console.log("Mail Sent");
      }

      else {
        if (user) {
          let Token = CreateToken({ id: user._id });
          MailValidate(userMail, "http://localhost:3000/ForgetPassword", Token);
          console.log("Mail Sent");
        }
        else {
          console.log("user not found");
        }


      }
      res.send({ Error: false, Message: "Please check your email" });

    })


}

// function Usef orgetPasswordToken(req, res) {
//   if (req.userid) {
//     User.findById(req.userid, (err, user) => {
//       if (err) {
//         res.send("Invalid Token");
//       } else
//         if (user) {

//           if (!VerifyTokenDate(user.passwordTimeStamp, req.iat)) {
//             res.send("Token expired");
//           }

//           else {
//             user.forgotPasswrod = true;
//             user.save((err, newUser) => {
//               if (err) {
//                 console.log(err);
//               }
//               else {
//                 res.send("Done");

//               }

//             })


//           }



//         }
//         else {
//           res.send("user not found");
//         }
//     })


//   }
// }


function ChangeForgottenPassword(req, res) {
  if (req.userid) {
    User.findById(req.userid, (err, user) => {
      if (err) {
        res.send({ Error: true, Message: "Invalid request" });
        console.log(err);
      } else if (user) {
        if (!VerifyTokenDate(user.passwordTimeStamp, req.iat)) {
          res.send({ Error: true, Message: "Token expired" });
          console.log("Token expired as the pass was changed already");

        }
        else {
          let { salt, hash } = genPassword(req.body.password);
          user.salt = salt;
          user.hash = hash;
          user.passwordTimeStamp = new Date();
          user.forgotPasswrod = false;
          user.save((err, user) => {
            if (err) {
              res.send({ Error: true, Message: "Cannot Change user Password" });
              console.log(err);
            }
            else {
              res.send({ Error: false, Message: "Password Changed" });
              console.log("Password Changed");

            }
          })

        }



      }
      else {
        res.send({ Error: true, Message: "ERROR UNKOWN" });
      }
    })


  }



}


function ChangePassword(req, res, next) {

  if (req.user._id) {
    User.findById(req.user._id, (err, user) => {
      if (err) {
        res.send(err);
      } else if (user) {
        if (req.body.oldPassword) {
          let SameOldPassword = validPassword(req.body.oldPassword, user.hash, user.salt);
          if (SameOldPassword) {
            let { salt, hash } = genPassword(req.body.password);
            user.salt = salt;
            user.hash = hash;
            user.save((err, user) => {
              if (err) {
                console.log(err);
              }
              else {
                res.send({ Error: false, Message: "Password Changed" });
                req.logout(function (err) {
                  if (err) {
                    console.log(err);
                  }
                });
                console.log("Password Changed");
              }
            })
          }
          else {
            res.send({ Error: true, Message: "Wrong Password" });
            console.log("Wrong Password");
          }

        }
        else {
          res.send({ Error: true, Message: "Invalid Request" });
          console.log("old Password is not provided");
        }


      }
      else {
        res.send({ Error: false, Message: "user not found" });
        console.log("user not found");

      }
    })


  }

}

function ValidateUser(req, res) {
  if (req.userid) {
    User.findById(req.userid, (err, user) => {
      if (err) {
        res.send("Invalid Token " + err);
      } else
        if (user) {

          if (!VerifyTokenDate(user.emailTimeStamp, req.iat)) {
            res.send("Token expired");
          }
          else {

            user.valid = true;
            user.emailTimeStamp = new Date();
            user.save((err, user) => {
              if (err) {
                console.log(err);
              }
              else {
                res.redirect("/user/login");

              }
            })
          }


        }
        else {
          res.send("user not found");
        }
    })


  }
}

function ChangeEmail(req, res) {
  let userMail = req.body.email;
  User.findOne({ email: userMail.toLowerCase() }, (err, user) => {
    if (err) {
      res.send(err)
    }
    else {
      if (user) {
        res.send("Email already exists");
      }
      else {
        let Token = CreateToken({ id: req.user._id, email: userMail, oldemail: req.user.email });
        MailValidate(userMail, "http://localhost:5000/user/resetEmail", Token);
        res.send("Verify mail sent");
      }
    }
  });


}

function UseChangeEmailToken(req, res) {
  if (req.user.email.toLowerCase() !== req.oldemail.toLowerCase()) {
    res.send("Invalide Token");
  }
  else
    if (req.user._id) {

      User.findById(req.user._id, (err, user) => {
        if (err) {
          res.send("Invalid Token " + err);
        } else
          if (user) {
            if (!VerifyTokenDate(user.emailTimeStamp, req.iat)) {
              res.send("Token expired");
            }
            else {
              user.email = req.email;
              user.emailTimeStamp = new Date();
              user.save((err, user) => {
                if (err) {
                  console.log(err);
                }
                else {
                  res.send("Email Changed");

                }
              })
            }
          }
      })
    }


}

async function viewRatings(req, res) {
  try {
    var ratings = await CourseTable.find().select({
      "price": 1, "title": 1
    }).sort({ "price": "ascending" })
    res.send(ratings)
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
};

async function giveCourseRating(req, res, next) {
  newRating = req.body.rating;
  oldRating = req.body.oldRating;
  userId = req.body.userId;
  courseId = req.body.courseId;
  let query = {};
  query.rating = newRating;
  try {
    if (req.body.oldRating) {
      switch (oldRating) {
        case 1: await CourseTable.findByIdAndUpdate({ "_id": courseId }, { $inc: { "rating.one": -1 } }, { new: true });
          break;
        case 2: await CourseTable.findByIdAndUpdate({ "_id": courseId }, { $inc: { "rating.two": -1 } }, { new: true });
          break;
        case 3: await CourseTable.findByIdAndUpdate({ "_id": courseId }, { $inc: { "rating.three": -1 } }, { new: true });
          break;
        case 4: await CourseTable.findByIdAndUpdate({ "_id": courseId }, { $inc: { "rating.four": -1 } }, { new: true });
          break;
        case 5: await CourseTable.findByIdAndUpdate({ "_id": courseId }, { $inc: { "rating.five": -1 } }, { new: true });
          break;
        default: ;
      }
    }
    switch (newRating) {
      case 1: await CourseTable.findByIdAndUpdate({ "_id": courseId }, { $inc: { "rating.one": 1 } }, { new: true });
        break;
      case 2: await CourseTable.findByIdAndUpdate({ "_id": courseId }, { $inc: { "rating.two": 1 } }, { new: true });
        break;
      case 3: await CourseTable.findByIdAndUpdate({ "_id": courseId }, { $inc: { "rating.three": 1 } }, { new: true });
        break;
      case 4: await CourseTable.findByIdAndUpdate({ "_id": courseId }, { $inc: { "rating.four": 1 } }, { new: true });
        break;
      case 5: await CourseTable.findByIdAndUpdate({ "_id": courseId }, { $inc: { "rating.five": 1 } }, { new: true });
        break;
      default: res.send("error no rating");
    }
    const y = await CourseTable.find({ "_id": courseId }).select({ "rating": 1, "_id": 0 });
    var rate = Object.values(y)[0];
    console.log(y);
    console.log(rate);
    var keys = Object.keys(rate.rating);
    var values = Object.values(rate.rating);
    var z = {};
    for (var i = 0; i < keys.length; i++) {
      z[keys[i]] = values[i];
    };
    var average = (((z.one) + (z.two * 2) + (z.three * 3) + (z.four * 4) + (z.five * 5)) / (z.one + z.two + z.three + z.four + z.five)).toFixed(2);
    console.log(average);
    const xx = await CourseTable.findByIdAndUpdate({ "_id": courseId }, { "rating.avg": average }, { new: true });
    const review = await User.updateOne({ "_id": userId, "purchasedCourses.courseID": courseId },
      { "$set": { "purchasedCourses.$.courseRating": newRating } }
    );
    res.send(200);

  } catch (error) {
    res.status(400).json({ error: error.message })
  }

};



async function giveInstructorRating(req, res, next) {
  newRating = req.body.rating;
  oldRating = req.body.oldRating;
  userId = req.body.userId;
  courseId = req.body.courseId;
  instructorId = req.body.instructorId;
  let query = {};
  query.rating = newRating;
  try {
    if (req.body.oldRating) {
      switch (oldRating) {
        case 1: await User.findByIdAndUpdate({ "_id": instructorId }, { $inc: { "instructorRating.one": -1 } }, { new: true });
          break;
        case 2: await User.findByIdAndUpdate({ "_id": instructorId }, { $inc: { "instructorRating.two": -1 } }, { new: true });
          break;
        case 3: await User.findByIdAndUpdate({ "_id": instructorId }, { $inc: { "instructorRating.three": -1 } }, { new: true });
          break;
        case 4: await User.findByIdAndUpdate({ "_id": instructorId }, { $inc: { "instructorRating.four": -1 } }, { new: true });
          break;
        case 5: await User.findByIdAndUpdate({ "_id": instructorId }, { $inc: { "instructorRating.five": -1 } }, { new: true });
          break;
        default: ;
      }
    }
    switch (newRating) {
      case 1: await User.findByIdAndUpdate({ "_id": instructorId }, { $inc: { "instructorRating.one": 1 } }, { new: true });
        break;
      case 2: await User.findByIdAndUpdate({ "_id": instructorId }, { $inc: { "instructorRating.two": 1 } }, { new: true });
        break;
      case 3: await User.findByIdAndUpdate({ "_id": instructorId }, { $inc: { "instructorRating.three": 1 } }, { new: true });
        break;
      case 4: await User.findByIdAndUpdate({ "_id": instructorId }, { $inc: { "instructorRating.four": 1 } }, { new: true });
        break;
      case 5: await User.findByIdAndUpdate({ "_id": instructorId }, { $inc: { "instructorRating.five": 1 } }, { new: true });
        break;
      default: res.send("error no rating");
    }
    const y = await User.find({ "_id": instructorId }).select({ "instructorRating": 1, "_id": 0 });
    var rate = Object.values(y)[0];
    console.log(y);
    console.log(rate);
    var keys = Object.keys(rate.instructorRating);
    var values = Object.values(rate.instructorRating);
    var z = {};
    for (var i = 0; i < keys.length; i++) {
      z[keys[i]] = values[i];
    };
    var average = (((z.one) + (z.two * 2) + (z.three * 3) + (z.four * 4) + (z.five * 5)) / (z.one + z.two + z.three + z.four + z.five)).toFixed(2);
    console.log(average);
    const xx = await User.findByIdAndUpdate({ "_id": instructorId }, { "instructorRating.avg": average }, { new: true });
    const review = await User.updateOne({ "_id": userId, "purchasedCourses.courseID": courseId },
      { "$set": { "purchasedCourses.$.instructorRating": newRating } }
    );
    res.send(200);

  } catch (error) {
    res.status(400).json({ error: error.message })
  }

};

async function giveCourseReview(req, res, next) {
  rating = req.body.rating;
  review = req.body.review;
  userId = req.body.userId;
  username = req.body.username;
  courseId = req.body.courseId;
  try {
    if (req.body.oldReview) {

      const reviewx = await CourseTable.updateOne({ "_id": courseId, "review.username": username },
        { "$set": { "review.$.reviewBody": review, "review.$.rating": rating } }
      );

      const R = await User.updateOne({ "_id": userId, "purchasedCourses.courseID": courseId },
        { "$set": { "purchasedCourses.$.courseReview": review } }
      );

      res.sendStatus(200);
    }
    else {
      await CourseTable.updateOne({ "_id": courseId },
        { "$push": { "review": { "reviewBody": review, "rating": rating, "username": username } } }
      );

      const R = await User.updateOne({ "_id": userId, "purchasedCourses.courseID": courseId },
        { "$set": { "purchasedCourses.$.courseReview": review } }
      );
      res.sendStatus(200);
    }

  } catch (error) {
    res.status(400).json({ error: error.message })
  }

}

async function giveInstructorReview(req, res, next) {
  rating = req.body.rating;
  review = req.body.review;
  userId = req.body.userId;
  username = req.body.username;
  courseId = req.body.courseId;
  instructorId = req.body.instructorId
  try {
    if (req.body.oldReview) {

      const reviewx = await User.updateOne({ "_id": instructorId, "instructorReview.username": username },
        { "$set": { "instructorReview.$.reviewBody": review, "instructorReview.$.rating": rating } }
      );

      const R = await User.updateOne({ "_id": userId, "purchasedCourses.courseID": courseId },
        { "$set": { "purchasedCourses.$.instructorReview": review } }
      );

      res.sendStatus(200);
    }
    else {
      const re = await User.updateOne({ "_id": instructorId },
        { "$push": { "instructorReview": { "reviewBody": review, "rating": rating, "username": username } } }, { new: true }
      );
      console.log(re);
      const R = await User.updateOne({ "_id": userId, "purchasedCourses.courseID": courseId },
        { "$set": { "purchasedCourses.$.instructorReview": review } }
      );
      res.sendStatus(200);
    }

  } catch (error) {
    res.status(400).json({ error: error.message })
  }

}

async function selectCourse(req, res, next) {
  try {
    let info = {};
    let exercise = {};
    if (req.body.courseId) {
      if (req.body.userId) {
        var instructor = await CourseTable.findOne({ "instructorID": req.body.userId }, { instructorID: 1 });
        if (instructor) {
          ////////////////instructor/////////////////////
          info.Owner = "yes";
          x = await CourseTable.findOne({ "_id": req.body.courseId }, { review: { "$slice": 3 } });
          info.course = x;
          var instructor1 = await User.findOne({ "_id": (x.instructorID) }).select({
            instructorRating: 1,
            biography: 1,
            _id: 1,
            firstname: 1,
            lastname: 1,
            instructorReview: { "$slice": 3 },
          });
          info.instructor = instructor1;
          info.course = x;
          res.send(info);
          return;
          //////////////////////////////////////////////////////////////////////////

        }
        ////////////////indivTrainee/Corp/////////////////////
        var x = await User.findOne({ "_id": req.body.userId }).select({ role: 1, purchasedCourses: { $elemMatch: { courseID: req.body.courseId } }, _id: 1 });
        if (x.purchasedCourses) {
          for (var i = 0; i < x.purchasedCourses.length; i++) {
            var z = Object.values(x.purchasedCourses)[i];
            if (z.courseID == req.body.courseId) {
              /////////////////User bought the course already/////////////////////
              if (z.courseRating) {
                info.yourCourseRating = z.courseRating;
              }
              else {
                info.yourCourseRating = null;
              }
              if (z.instructorRating) {
                info.yourInstructorRating = z.instructorRating;
              }
              else {
                info.yourInstructorRating = null;
              }
              if (z.courseReview) {
                info.yourCourseReview = z.courseReview;
              }
              else {
                info.yourCourseReview = null;
              }
              if (z.instructorReview) {
                info.yourinstructorReview = z.instructorReview;
              } else {
                info.yourinstructorReview = null;
              }
              if (z.lastWatched) {
                info.lastWatched = z.lastWatched;
              }
              else {
                info.lastWatched = null;
              }
              info.notes = z.notes;
              info.progress = z.progress;
              info.purchased = "yes";
              info.watchedVideos = z.watchedVideos;
              x = await CourseTable.findOne({ "_id": req.body.courseId },
                { review: { "$slice": 3 } });
              info.course = x;
              var instructor = await User.findOne({ "_id": (x.instructorID) }).select({
                instructorRating: 1,
                biography: 1,
                _id: 1,
                firstname: 1,
                lastname: 1,
                instructorReview: { "$slice": 3 }
              });
              info.instructor = instructor;
              info.course = x;
              res.send(info);
              return;
              //////////////////////////////////////////////////////////////////////////
            }
          }
          //////////CorporateTraineeRequest///////////////////////////////////
          if (x.role == "CorporateTrainee") {
            var exists = await requestTable.findOne({ "userID": req.body.userId, "courseID": req.body.courseId, "type": "RequestCourse", "status": "Pending" });
            if (exists) {
              var x = await CourseTable.findOne({ "_id": req.body.courseId }).select({
                _id: 1,
                title: 1,
                summary: 1,
                rating: 1,
                instructorName: 1,
                courseVideo: 1,
                courseHours: 1,
                level: 1,
                price: 1,
                discount: 1,
                discountPrice: 1,
                subject: 1,
                "subtitles.header": 1,
                "subtitles.summary": 1,
                "subtitles.totalMinutes": 1,
                "subtitles.contents.contentTitle": 1,
                "subtitles.contents.duration": 1,
                "subtitles.exercises.exerciseTitle": 1,
                courseImage: 1,
                instructorID: 1,
                review: { "$slice": 3 }
              });
              //console.log(x);
              var instructor = await User.findOne({ "_id": (x.instructorID) }).select({
                instructorRating: 1,
                biography: 1,
                _id: 1,
                firstname: 1,
                lastname: 1,
              });
              let q = {};
              q.purchased = "Pending";
              q.course = x;
              q.instructor = instructor;
              res.send(q);

            }
          }


        }
      }
      ////////////////Guest/////////////////////
      var x = await CourseTable.findOne({ "_id": req.body.courseId }).select({
        _id: 1,
        title: 1,
        summary: 1,
        rating: 1,
        instructorName: 1,
        courseVideo: 1,
        courseHours: 1,
        level: 1,
        price: 1,
        discount: 1,
        discountPrice: 1,
        subject: 1,
        "subtitles.header": 1,
        "subtitles.summary": 1,
        "subtitles.totalMinutes": 1,
        "subtitles.contents.contentTitle": 1,
        "subtitles.contents.duration": 1,
        "subtitles.exercises.exerciseTitle": 1,
        courseImage: 1,
        instructorID: 1,
        review: { "$slice": 3 }
      });
      var instructor = await User.findOne({ "_id": (x.instructorID) }).select({
        instructorRating: 1,
        biography: 1,
        _id: 1,
        firstname: 1,
        lastname: 1,
      });
      let q = {};
      q.purchased = "no";
      q.course = x;
      q.instructor = instructor;
      res.send(q);
    }

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

async function ViewMyCourses(req, res, next) {
  try {
    var CurrentPage = req.query.page ? req.query.page : 1;
    var y = await User.findOne({ "_id": req.query.userId }).select({ purchasedCourses: 1, _id: 0 });
    if (y.purchasedCourses.length) {
      var ids = [y.purchasedCourses.length];

      for (var i = 0; i < y.purchasedCourses.length; i++) {
        var z = Object.values(y.purchasedCourses)[i];
        ids[i] = z.courseID;
        console.log(ids[i]);
      }
      x = await CourseTable.find({ "_id": { $in: ids } }).select({
        _id: 1,
        title: 1,
        courseHours: 1,
        courseImage: 1,
        instructorName: 1,
        subject: 1,
        summary: 1
      }).skip((CurrentPage - 1) * 5).limit(5);
      res.send(x);
      return;
    }
    res.send(y.purchasedCourses);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

async function takeExam(req, res, next) {
  try {
    const exam = await ExerciseTable.find({ "_id": req.query.examID }).select({
      "_id": 1,
      "courseID": 1,
      "exerciseTitle": 1,
      "questions": 1,
      "totalGrade": 1
    });
    res.status(200).json(exam);
  }
  catch (err) {
    res.status(400).json({ error: error.message })
  }
};



async function buyCourse(req, res, next) {
  //endpoints userID ,courseID
  try {
    const exists = await User.findOne({ "_id": req.body.userID, "purchasedCourses.courseID": req.body.courseID });
    if (exists) {
      res.status(400).send("Course already bought");
      return;
    }
    const user = await User.findByIdAndUpdate({ "_id": req.body.userID },
      { $push: { "purchasedCourses": { courseID: req.body.courseID } } }, { new: true });

    const course = await CourseTable.findByIdAndUpdate({ "_id": req.body.courseID },
      { $inc: { "purchases": 1 } }, { new: true });

    const result = await transactionTable.create({
      userID: user._id,
      instructorID: course.instructorID,
      courseID: course._id,
      transactionDate: Date.now(),
      transactionAmount: req.body.amount,
    });
    result.save();

    next();

  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};

async function unbuyCourse(req, res, next) {
  //endpoints userID ,courseID
  try {
    const user = await User.findByIdAndUpdate({ "_id": req.body.userID },
      { $pull: { "purchasedCourses": { courseID: req.body.courseID } } }, { new: true });

    const course = await CourseTable.findByIdAndUpdate({ "_id": req.body.courseID },
      { $inc: { "purchases": -1 } }, { new: true });

    const transaction = await transactionTable.deleteOne({ userID: user._id, courseID: course._id });

    res.status(400).send("payment unsucessful");

  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

async function submitAnswer(req, res) {
  try {
    var grade = req.body.grade;
    var user_id = req.body.userID;
    var counter = 0;
    var course_id = req.body.courseID;
    var course = await CourseTable.findById(course_id);
    //var subtitles=course.subtitles;
    var excerciseID = req.body.excerciseID
    var actualExcercise = await ExerciseTable.findById(excerciseID);
    var answers = req.body.answers;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] == actualExcercise.questions[i].answer) {
        counter++
      }
    }


    var exists = await User.findOne({ "purchasedCourses.excercises.excerciseID": excerciseID, "_id": user_id })
    console.log(actualExcercise);
    console.log(exists);


    //var user=await User.findById(user_id);
    if (exists) {
      const re = await User.updateOne({ "_id": user_id, "purchasedCourses.courseID": course_id },
        {
          "$set": {
            "purchasedCourses.$.excercises":
              { "excerciseID": excerciseID, "grade": grade, "exercisesAnswers": { "exerciseTitle": actualExcercise.exerciseTitle, "answer": answers } }
          }
        }
      );
      res.send(re);
    }
    else {
      const re = await User.updateOne({ "_id": user_id, "purchasedCourses.courseID": course_id },
        {
          "$push": {
            "purchasedCourses.$.excercises":
              { "excerciseID": excerciseID, "grade": grade, "exercisesAnswers": { "exerciseTitle": actualExcercise.exerciseTitle, "answer": answers } }
          }
        }
      );
      res.send(re);
    }


  }
  catch (error) {
    console.log(error);
  }

};

async function test(req, res) {
  try {
    var x = await User.find()
    res.send(x);


  }
  catch (error) {
    console.log(error);
  }
};

module.exports = {
  register, Logout, ViewAll, viewRatings, getRate, giveCourseRating,
  buyCourse, unbuyCourse, ViewMyCourses, forgetPassword, ValidateUser, ChangeForgottenPassword, ChangePassword,
  ChangeEmail, UseChangeEmailToken, selectCourse, giveInstructorRating, giveCourseReview, giveInstructorReview, submitAnswer, test, takeExam
}





/*{
  "user_id":"6383d9da6670d09304d2b016",
  "courseID":"637f97cb7c7a24250c993ae2",
  "answers":["what","about"]
}*/
