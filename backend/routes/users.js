const auth = require("../middleware/auth-middle");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, userSchema } = require("../models/user-model");

// function to add to database
async function addUserToDb(req, res) {
  const user = new User(_.pick(req.body, ["username", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  return user.save();
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

  try {
    const result = await addUserToDb(req, res);
    res.status(200).send(result);
  } catch (e) {
    res.status(401).send(e);
  }
});

module.exports = router;
