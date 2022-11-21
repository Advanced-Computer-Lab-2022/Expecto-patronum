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
const CourseTable = require('../models/CourseSchema');

function register(req, res) {
  const saltHash = genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

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
      console.log("User Added")
      CheckUserType(newUser);
      let token = CreateToken({ id: newUser._id, email: newUser.email });
      MailValidate(newUser.email, "http://localhost:5000/user/MailVerify", token);
      res.send("Please verify your email");

    }

  })

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
  User.findOne({ email: userMail },
    (err, user) => {
      if (err) res.send(err);
      else {
        if (user) {
          let Token = CreateToken({ id: user._id });
          MailValidate(userMail, "http://localhost:5000/user/forgetPassword", Token);
          res.send("Verify mail sent");
        }
        else {
          res.send("User not found")
        }


      }
    })


}

// function UseforgetPasswordToken(req, res) {
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
        res.send(err);
      } else if (user) {
        if (!VerifyTokenDate(user.passwordTimeStamp, req.iat)) {
          res.send("Token expired");
        }
        else {
          let { salt, hash } = genPassword(req.body.password);
          user.salt = salt;
          user.hash = hash;
          user.passwordTimeStamp = new Date();
          user.forgotPasswrod = false;
          user.save((err, user) => {
            if (err) {
              console.log(err);
            }
            else {
              res.send("Password Changed");
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
                res.send("Password Changed");
              }
            })
          }
          else {
            res.send("Invalid Password");
          }

        }
        else {
          res.send("Invalid Request");
        }


      }
      else {
        res.send("user not found");
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
  User.findOne({ email: userMail }, (err, user) => {
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
  if (req.user.email !== req.oldemail) {
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
    if(req.body.oldRating){
      switch (oldRating) {
      case 1: await CourseTable.findByIdAndUpdate({ "_id": courseId }, { $inc: { "rating.one": -1 } }, { new: true });
        break;
      case 2: await CourseTable.findByIdAndUpdate({ "_id": courseId }, { $inc: { "rating.two": -1 } }, { new: true });
        break;
      case 3: await CourseTable.findByIdAndUpdate({ "_id": courseId }, { $inc: { "rating.three":-1 } }, { new: true });
        break;
      case 4: await CourseTable.findByIdAndUpdate({ "_id": courseId }, { $inc: { "rating.four": -1 } }, { new: true });
        break;
      case 5: await CourseTable.findByIdAndUpdate({ "_id": courseId }, { $inc: { "rating.five": -1 } }, { new: true });
        break;
      default:;
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
  const review = await User.updateOne({ "_id": userId,"purchasedCourses.courseID":courseId},
  { "$set": { "purchasedCourses.$.courseRating": newRating }}
  );
    res.send(200);

  } catch (error) {
    console.log(error);
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
    if(req.body.oldRating){
      switch (oldRating) {
      case 1: await User.findByIdAndUpdate({ "_id": instructorId }, { $inc: { "instructorRating.one": -1 } }, { new: true });
        break;
      case 2: await User.findByIdAndUpdate({ "_id": instructorId }, { $inc: { "instructorRating.two": -1 } }, { new: true });
        break;
      case 3: await User.findByIdAndUpdate({ "_id": instructorId }, { $inc: { "instructorRating.three":-1 } }, { new: true });
        break;
      case 4: await User.findByIdAndUpdate({ "_id": instructorId }, { $inc: { "instructorRating.four": -1 } }, { new: true });
        break;
      case 5: await User.findByIdAndUpdate({ "_id": instructorId }, { $inc: { "instructorRating.five": -1 } }, { new: true });
        break;
      default:;
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
  const review = await User.updateOne({ "_id": userId,"purchasedCourses.courseID":courseId},
  { "$set": { "purchasedCourses.$.instructorRating": newRating }}
  );
    res.send(200);

  } catch (error) {
    console.log(error);
  }

};



async function selectCourse(req, res, next){
  try {
    let info = {};
    if (req.body.courseId) {
      var x = await User.find({ "_id": req.body.userId }).select({ purchasedCourses: 1, _id: 0 });
      var y = Object.values(x)[0];
      for (var i = 0; i < y.purchasedCourses.length; i++) {
        var z = Object.values(y.purchasedCourses)[i];
        if (z.courseID == req.body.courseId) {
          if(z.courseRating){
            info.yourCourseRating = z.courseRating;
          }
          if(z.instructorRating){
            info.yourInstructorRating = z.instructorRating;
          }
          if(z.courseReview){
            info.yourCourseRating = z.courseReview;
          }
          if(z.instructorReview){
            info.yourinstructorReview = z.instructorReview;
          }
          x = await CourseTable.find({ "_id": req.body.courseId });
          res.send({ purchased: "yes", yourInfo: info ,courses: x });
          return;
        }
      }
      x = await CourseTable.find({ "_id": req.body.courseId }).select({
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
      });
      res.send({ purchased: "no", courseID: x });
    }
  } catch (error) {
    
  }
}

async function ViewMyCourses(req, res, next) {
  try {
      var CurrentPage = req.query.page ? req.query.page : 1; 
      var x = await User.find({ "_id": req.body.userId }).select({ purchasedCourses: 1, _id: 0 });
      var y = Object.values(x)[0];
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
        price: 1,
        courseImage: 1,
        rating: 1,
        instructorName: 1,
        subject: 1,
        summary: 1,
        discount: 1,
        discountPrice: 1
      }).skip((CurrentPage - 1) * 5).limit(5);
      res.send(x);
  } catch (error) {
    console.log(error);
  }
};

async function buyCourse(req, res, next) {
  // let obj = {
  //   "purchasedCourses":[
  //     {
  //   "courseID":req.body.courseId
  // }]};
  try {
    const xx = await User.findByIdAndUpdate({ "_id": req.body.userId }, { $push: { "purchasedCourses": req.body.purchasedCourses } }, { new: true });
    res.send(xx);

  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, Logout, ViewAll, viewRatings, getRate, giveCourseRating,
   buyCourse, ViewMyCourses, forgetPassword, ValidateUser, ChangeForgottenPassword, ChangePassword,
    ChangeEmail, UseChangeEmailToken,selectCourse,giveInstructorRating }
