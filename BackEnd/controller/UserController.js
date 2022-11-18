const CheckUserType = require("../lib/CheckRoleUtils");
const { genPassword } = require("../lib/passwordUtils");
const User = require('../models/UserSchema');
const passport = require('passport');
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
    }

  })

};


function Logout(req, res) {
  req.logout((err) => { if (err) console.log(`the Error is ${err}`) });
  res.send("Logged out");


}

async function ViewAll(req,res){
  try{
    var allCourses=await CourseTable.find().select({ 
      "title":1, "courseHours":1,"rating":1 
    });
    res.send(allCourses);
  }
  catch(error){

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

async function viewRatings(req,res){
  try{
    var ratings=await CourseTable.find().select({
      "price":1,"title":1
    }).sort({"price":"ascending"})
    res.send(ratings)
  }
  catch(error){

  }
};

async function giveCourseRating(req, res, next){
  username = req.body.username;
  rating = req.body.rating;
  courseId = req.body.courseId;
  let query = {};
  query.username = username;
  query.rating = rating;
  try {
    switch(rating){
      case 1:await CourseTable.findByIdAndUpdate({ "_id": courseId }, {$inc :{"rating.one": 1}}, { new: true });
      break;
      case 2:await CourseTable.findByIdAndUpdate({ "_id": courseId }, {$inc :{"rating.two": 1}}, { new: true });
      break;
      case 3:await CourseTable.findByIdAndUpdate({ "_id": courseId }, {$inc :{"rating.three": 1}}, { new: true });
      break; 
      case 4:await CourseTable.findByIdAndUpdate({ "_id": courseId }, {$inc :{"rating.four": 1}}, { new: true });
      break;
      case 5:await CourseTable.findByIdAndUpdate({ "_id": courseId }, {$inc :{"rating.five": 1}}, { new: true });
      break;
      default:res.send("error no rating");     
    }
    const y = await CourseTable.find({"_id":courseId}).select({"rating":1,"_id":0});
    var rate = Object.values(y)[0];
    var keys = Object.keys(rate.rating);
    var values = Object.values(rate.rating);
    console.log(keys);
    console.log(values);
    var z = {};
  for (var i = 0; i < keys.length; i++) {
    z[keys[i]] = values[i];
  };
    var average = (((z.one)+(z.two*2)+(z.three*3)+(z.four*4)+(z.five*5))/(z.one+z.two+z.three+z.four+z.five)).toFixed(2);
    console.log(average);
    const xx = await CourseTable.findByIdAndUpdate({ "_id": courseId }, {"rating.avg": average}, { new: true });
    const review = await CourseTable.findByIdAndUpdate({ "_id": courseId }, {$push :{"review":query}},{ new: true });
    res.status(200).json(review);

  } catch (error) {
   // console.log(error);
  }

};

module.exports = { register, Logout,ViewAll,viewRatings,getRate,giveCourseRating }