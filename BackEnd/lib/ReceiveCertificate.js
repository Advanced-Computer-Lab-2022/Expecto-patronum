const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  secure: false, // true for 465, false for other ports
  auth: {
    user: "CandianChamber123@outlook.com", // generated ethereal user
    pass: "RodinRodin", // generated ethereal password

  },
});
var fs = require('fs');
module.exports.ReceiveCertificate = async (userMail) => {
  console.log("----------------------------------------------")
  console.log(userMail)
  console.log("----------------------------------------------")
  let info = await transporter.sendMail({
    from: 'CandianChamber123@outlook.com', // sender address
    to: userMail, // list of receivers
    subject: "Your Certificate", // Subject line
    text: "your Certificate is here",
    attachments: [
      {
        filename: 'Course_Completion_Certificate.pdf',
        path: './Course_Completion_Certificate.pdf',
        contentType: 'application/pdf'
      }]
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
