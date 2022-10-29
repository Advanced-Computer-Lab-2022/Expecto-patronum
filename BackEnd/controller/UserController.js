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

async function viewRatings(req,res){
  try{
    var ratings=await CourseTable.find().select({
      "price":1,"title":1
    }).sort({"price":"ascending"})
    res.send(ratings)
  }
  catch(error){

  }
}

module.exports = { register, Logout,ViewAll,viewRatings }