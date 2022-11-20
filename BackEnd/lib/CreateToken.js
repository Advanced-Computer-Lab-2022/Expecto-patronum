var jwt = require('jsonwebtoken');

function CreateToken(payloadData) {
  return jwt.sign(payloadData, process.env.SECRET_KEY, { expiresIn: '1h' });
}



module.exports = { CreateToken }