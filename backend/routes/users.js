const auth = require("../middleware/auth-middle");
const config = require("config");
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, userSchema } = require("../models/user-model");

// function to add to database
async function addUserToDb(req, res) {
  const user = new User(_.pick(req.body, ["username", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  return user;
}

// function toh send mail to user
function sendEmail(req, res) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "funnymission08@gmail.com",
      pass: config.get("password"),
    },
  });

  const mailOptions = {
    from: "funnymission08@gmail.com",
    to: req.body.email,
    subject: "Email Verification",
    text:
      "<a href='http://localhost:3000/api/users/verify'>Verification Link</a>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

// route handler to allow headers
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-auth-token"
  );
  next();
});

// route handler to get the url of current page
router.post("/location", (req, res) => {
  loc = req.body.loc;
  res.status(200).send(loc);
});

// route handler for verification link
router.get("/verify", async (req, res) => {
  const user = await addUserToDb(request, response);
  res.redirect(loc);
});

// route handler to get the current user
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

// route handler to register a user
router.post("/", async (req, res) => {
  const result = userSchema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  let userAlreadyExists = await User.findOne({ email: req.body.email });
  if (userAlreadyExists) {
    return res.status(400).send("User with this email already registered");
  }

  request = req;
  response = res;
  sendEmail(req, res);

  res.send(
    "We have sent a verification email to your account please click on the link provided in the email to continue verify your identity.."
  );
});

let loc = "http://127.0.0.1:5500/index.html";
let request = "request body";
let response = "just to pass something as response";

module.exports = router;
