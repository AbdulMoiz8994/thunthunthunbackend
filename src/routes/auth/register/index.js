const bcrypt=require("bcryptjs");
const User=require("../../../modals/user");
const { insertDocument } = require("../../../helpers");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../../../config");
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., use 'gmail' or any other service
  auth: {
    user: process.env.email, // Your email
    pass: process.env.password,  // Your email password or app password if 2FA is enabled
  },
});

// Verify the connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

const signUpUser= async (req, res) => {
  
    let { email, password } = req.body;
    console.log("body", req.body);
    try {
      let checkEmail = await User.findOne({ email: email });
      if (checkEmail) {
        return res
          .status(404)
          .json({ status: 404, message: "User Already Exist" });
      }
      let finalResp = {
        ...req.body,
        password: await bcrypt.hash(password, bcrypt.genSaltSync(10)),
      };
  
    let finalUser =await insertDocument("user",finalResp) 
    console.log("finalUser", finalUser);
    const token = await jwt.sign({ id: finalUser._id }, TOKEN_SECRET);
    console.log("token Sign up", token);
      finalUser.password = undefined;

      const mailOptions = {
        from: process.env.email, // sender address
        to: email, // list of receivers
        subject: ' Welcome to Infulto Congratulations! Your account has been created',
        text: `Hello ${finalUser.fullName},\n\nYour account has been created successfully. Welcome to Infulto!\n\nBest regards,\nThe Infulto Team`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });

      res.status(201).json({
        status: 201,
        finalUser,
        token: token,
        message: "Account has been created successfully",
      });
    } catch (err) {
      return res.status(400).json({ status: 400, message: err.message });
    }
};
  
module.exports=signUpUser;