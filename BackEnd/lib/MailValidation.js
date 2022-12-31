const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  secure: false, // true for 465, false for other ports
  auth: {
    user: "mohamedsalem52@outlook.com", // generated ethereal user
    pass: "Batman2012", // generated ethereal password
  },
});
module.exports.MailValidate = async (userMail, route, Token) => {
  let info = await transporter.sendMail({
    from: "mohamedsalem52@outlook.com", // sender address
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
