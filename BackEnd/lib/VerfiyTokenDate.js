var jwt = require('jsonwebtoken');

function VerifyTokenDate(EntityDate, iat) {
  var date = new Date();
  date

  let EntityLastChanged = new Date(EntityDate.toLocaleString());
  let iatDate = new Date(iat * 1000);
  console.log(EntityLastChanged);
  console.log(iatDate);
  if (EntityLastChanged.getTime() > iatDate.getTime()) {
    return false;
  }
  else {
    return true;
  }
}



module.exports = { VerifyTokenDate }