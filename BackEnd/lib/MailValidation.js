const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  secure: false, // true for 465, false for other ports
  auth: {
    user: "CandianEG@outlook.com", // generated ethereal user
    pass: "RodinRodin", // generated ethereal password

  },
});
module.exports.MailValidate = async (userMail, route, Token) => {
  console.log(userMail)
  let info = await transporter.sendMail({
    from: 'CandianEG@outlook.com', // sender address
    to: userMail, // list of receivers
    subject: "Hello ✔", // Subject line
    text: route + "/" + Token, // plain text body
    html: `<a href=${route + "/" + Token}>Click Here</a>`, // html body
  });
  transporter.sendMail(info, (err, data) => {
    if (err) {
      console.log("Error occurs", err);
    } else {
      console.log("Email sent!!!");
    }
  }
  )
}
