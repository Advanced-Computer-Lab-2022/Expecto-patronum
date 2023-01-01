/* 
1)check if req.session of each is the type then go to next
*/

module.exports.isInstructor = (req, res, next) => {
  if (req.user.role === "Instructor") {
    next();
  } else {
    res.status(401).send({ Error: true, Message: "You are not authorized" });

  }
}


module.exports.isAdmin = (req, res, next) => {
  if (req.user.role === "Admin") {
    next();
  } else {
    res.status(401).send({ Error: true, Message: "You are not authorized" });

  }

}


module.exports.isUser = (req, res, next) => {
  if (req.user.role === "User") {
    next();
  } else {
    res.status(401).send({ Error: true, Message: "You are not authorized" });

  }

}

module.exports.isCorporateTrainee = (req, res, next) => {
  if (req.user.role === "CorporateTrainee") {
    next();
  } else {
    res.status(401).send({ Error: true, Message: "You are not authorized" });

  }

}

module.exports.isStudent = (req, res, next) => {
  if (req.user.role === "CorporateTrainee"|| req.user.role === "User" ) {
    next();
  } else {
    res.status(401).send({ Error: true, Message: "You are not authorized" });

  }

}