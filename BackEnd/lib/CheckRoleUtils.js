const Admin = require("../models/AdminSchema");
const CorporateTrainee = require("../models/CorporateTraineeSchema");
const Instructor = require("../models/InstructorSchema");


module.exports = function CheckUserType(user) {
  console.log(user.role);
  let RoleTable = '';
  if (user.role === "Admin") {
    console.log("I am admin");

    RoleTable = new Admin({
      userID: user._id
    });

  }
  else if (user.role === "Instructor") {
    console.log("I am instructor");
    RoleTable = new Instructor({
      userID: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
    });

  }
  else if (user.role === "CorporateTrainee") {
    RoleTable = new CorporateTrainee({
      userID: user._id
    });
  }
  if (RoleTable !== '') {
    try {
      RoleTable.save()

    } catch (err) {
      console.log(err);
    }
  }
}

