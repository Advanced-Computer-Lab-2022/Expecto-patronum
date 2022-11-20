const CheckUserType = require("../lib/CheckRoleUtils");
const { genPassword, validPassword } = require("../lib/passwordUtils");
const User = require('../models/UserSchema');
const passport = require('passport');
const countryToCurrency = require('country-to-currency');
const CC = require('currency-converter-lt');
const { CreateToken } = require("../lib/CreateToken");
const { MailValidate } = require("../lib/MailValidation");
const { VerifyTokenDate } = require("../lib/VerfiyTokenDate");
const { Passport } = require("passport");

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
      let token = CreateToken({ id: newUser._id, email: newUser.email });
      MailValidate(newUser.email, "http://localhost:5000/user/MailVerify", token);
      res.send("Please verify your email");

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

function forgetPassword(req, res, next) {
  let userMail = req.body.email;
  User.findOne({ email: userMail },
    (err, user) => {
      if (err) res.send(err);
      else {
        if (user) {
          let Token = CreateToken({ id: user._id });
          MailValidate(userMail, "http://localhost:5000/user/forgetPassword", Token);
          res.send("Verify mail sent");
        }
        else {
          res.send("User not found")
        }


      }
    })


}

// function UseforgetPasswordToken(req, res) {
//   if (req.userid) {
//     User.findById(req.userid, (err, user) => {
//       if (err) {
//         res.send("Invalid Token");
//       } else
//         if (user) {

//           if (!VerifyTokenDate(user.passwordTimeStamp, req.iat)) {
//             res.send("Token expired");
//           }

//           else {
//             user.forgotPasswrod = true;
//             user.save((err, newUser) => {
//               if (err) {
//                 console.log(err);
//               }
//               else {
//                 res.send("Done");

//               }

//             })


//           }



//         }
//         else {
//           res.send("user not found");
//         }
//     })


//   }
// }


function ChangeForgottenPassword(req, res) {
  if (req.userid) {
    User.findById(req.userid, (err, user) => {
      if (err) {
        res.send(err);
      } else if (user) {
        if (!VerifyTokenDate(user.passwordTimeStamp, req.iat)) {
          res.send("Token expired");
        }
        else {
          let { salt, hash } = genPassword(req.body.password);
          user.salt = salt;
          user.hash = hash;
          user.passwordTimeStamp = new Date();
          user.forgotPasswrod = false;
          user.save((err, user) => {
            if (err) {
              console.log(err);
            }
            else {
              res.send("Password Changed");
            }
          })

        }



      }
      else {
        res.send("user not found");
      }
    })


  }



}


function ChangePassword(req, res, next) {

  if (req.user._id) {
    User.findById(req.user._id, (err, user) => {
      if (err) {
        res.send(err);
      } else if (user) {
        if (req.body.oldPassword) {
          let SameOldPassword = validPassword(req.body.oldPassword, user.hash, user.salt);
          if (SameOldPassword) {
            let { salt, hash } = genPassword(req.body.password);
            user.salt = salt;
            user.hash = hash;
            user.save((err, user) => {
              if (err) {
                console.log(err);
              }
              else {
                res.send("Password Changed");
              }
            })
          }
          else {
            res.send("Invalid Password");
          }

        }
        else {
          res.send("Invalid Request");
        }


      }
      else {
        res.send("user not found");
      }
    })


  }

}

function ValidateUser(req, res) {
  if (req.userid) {
    User.findById(req.userid, (err, user) => {
      if (err) {
        res.send("Invalid Token " + err);
      } else
        if (user) {

          if (!VerifyTokenDate(user.emailTimeStamp, req.iat)) {
            res.send("Token expired");
          }
          else {

            user.valid = true;
            user.emailTimeStamp = new Date();
            user.save((err, user) => {
              if (err) {
                console.log(err);
              }
              else {
                res.redirect("/user/login");

              }
            })
          }


        }
        else {
          res.send("user not found");
        }
    })


  }
}

function ChangeEmail(req, res) {
  let userMail = req.body.email;
  User.findOne({ email: userMail }, (err, user) => {
    if (err) {
      res.send(err)
    }
    else {
      if (user) {
        res.send("Email already exists");
      }
      else {
        let Token = CreateToken({ id: req.user._id, email: userMail, oldemail: req.user.email });
        MailValidate(userMail, "http://localhost:5000/user/resetEmail", Token);
        res.send("Verify mail sent");
      }
    }
  });


}

function UseChangeEmailToken(req, res) {
  if (req.user.email !== req.oldemail) {
    res.send("Invalide Token");
  }
  else
    if (req.user._id) {

      User.findById(req.user._id, (err, user) => {
        if (err) {
          res.send("Invalid Token " + err);
        } else
          if (user) {
            if (!VerifyTokenDate(user.emailTimeStamp, req.iat)) {
              res.send("Token expired");
            }
            else {
              user.email = req.email;
              user.emailTimeStamp = new Date();
              user.save((err, user) => {
                if (err) {
                  console.log(err);
                }
                else {
                  res.send("Email Changed");

                }
              })
            }
          }
      })
    }


}



module.exports = { register, Logout, getRate, forgetPassword, ValidateUser, ChangeForgottenPassword, ChangePassword, ChangeEmail, UseChangeEmailToken };