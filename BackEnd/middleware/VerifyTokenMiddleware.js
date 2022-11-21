var jwt = require('jsonwebtoken');
function VerifyTokenMiddleware(req, res, next) {

  jwt.verify(req.params.token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.send("Invalid Token" + err);
    }
    else {
      req.userid = decoded.id;
      req.iat = decoded.iat;
      if (decoded.email) {
        req.email = decoded.email;
      }
      if (decoded.oldemail) {
        req.oldemail = decoded.oldemail;
      }
      next();
    }
  })

}
module.exports = { VerifyTokenMiddleware }