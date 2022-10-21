module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send('<h1>You are not authenticated</h1><p><a href="/Auth/login">Login</a></p>');
  }

}
