const nodemailer = require("nodemailer");
const config = require("../../auth.json");

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true, //ssl
  auth: {
    user: config.mail.username,
    pass: config.mail.password
  }
});

function sendMail(mailOptions) {
  // send mail with defined transport object
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`couldn't send mail ${error}`);
        reject(error);
      } else {
        console.log("Message sent: " + info.response);
        resolve(info.response);
      }
    });
  });
}

exports.sendMail = sendMail;
