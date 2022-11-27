/* 
1)check if req.session of each is the type then go to next
*/

module.exports.isInstructor = (req, res, next) => {
  if (req.user.role === "Instructor") {
    next();
  } else {
    res.send('<h1>You are not Authorized</h1>');

  }
}


module.exports.isAdmin = (req, res, next) => {
  if (req.user.role === "Admin") {
    next();
  } else {
    res.send('<h1>You are not Authorized</h1>');

  }

}


module.exports.isCorporateTrainee = (req, res, next) => {
  if (req.user.role === "CorpTrainee") {
    next();
  } else {
    res.send('<h1>You are not Authorized</h1>');

  }

}