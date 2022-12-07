var jwt = require('jsonwebtoken');
function VerifyTokenMiddleware(req, res, next) {

  jwt.verify(req.params.token, process.env.SECRET_KEY, (err, decoded) => {
    console.log("Token " + req.params.token);
    if (err) {
      res.send({ Error: true, Message: 'Token is not valid' });
      console.log(err);
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