module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.valid) {
      next();

    } else {
      res.send({ Error: true, Message: "Please verify your email" });

    }
  } else {
    res.send({ Error: true, Message: "You are not authorized" });

  }

}
