module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.valid) {
      next();
    } else {
      res.status(401).send({ Error: true, Message: "Please verify your email" });
      // res.send({ Error: true, Message: "Please verify your email" });
    }
  } else {
    res.status(401).send({ Error: true, Message: "You are not authorized" });

  }

}
