const CheckUserType = require("../lib/CheckRoleUtils");
const { genPassword } = require("../lib/passwordUtils");
const User = require('../models/UserSchema');
const passport = require('passport');
const countryToCurrency = require('country-to-currency');
const CC = require('currency-converter-lt');

function register(req, res) {
  const saltHash = genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.username,
    hash: hash,
    salt: salt,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    role: req.body.role
  });


  newUser.save((err, newUser) => {
    if (err) {
      console.log(err);

    }
    else {
      console.log("User Added")
      CheckUserType(newUser);
    }

  })

};


function Logout(req, res) {
  req.logout((err) => { if (err) console.log(`the Error is ${err}`) });
  res.send("Logged out");


}


async function getRate(req, res, next) {
  const country = req.query.country;
  console.log("country " + country);
  const curr = countryToCurrency[country];
  let currencyConverter = new CC({ from: "USD", to: curr, amount: 1 });
  var rate = 1;
  await currencyConverter.rates().then((response) => {
    rate = response;
  });
  console.log("rate " + rate);
  try {
    res.send({ rate: rate, curr: curr });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, Logout, getRate }