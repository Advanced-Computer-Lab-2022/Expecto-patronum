/* 
1)check if req.session of each is the type then go to next
*/

module.exports.isInstructer = (req, res, next) => {
  if (req.user.Role === "instructer") {
    next();
  } else {
    res.send('<h1>You are not Authorized</h1><p><a href="/Auth/login">Login</a></p>');

  }

}


module.exports.isAdmin = (req, res, next) => {
  if (req.user.Role === "Admin") {
    next();
  } else {
    res.send('<h1>You are not Authorized</h1><p><a href="/Auth/login">Login</a></p>');

  }

}


module.exports.isCorpTrainee = (req, res, next) => {
  if (req.user.Role === "CorpTrainee") {
    next();
  } else {
    res.send('<h1>You are not Authorized</h1><p><a href="/Auth/login">Login</a></p>');

  }

}