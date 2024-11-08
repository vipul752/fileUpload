const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendMail = async (doc) => {
  try {
    const mail = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: doc.email,
      subject: "File uploaded successfully",
      text: "Your file has been uploaded successfully",
      html: `<h1>hello JEE</h1> <p>Your file has been uploaded successfully</p>`,
    });

    console.log(mail);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMail;
