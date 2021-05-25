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
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

router.post("/user", async (req, res) => {
  const user = await User.findById(req.body.id);
  res.send(user);
});

router.put("/user/changepass", auth, async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  let new_password = req.body.new_password;
  const curr_password = req.body.curr_password;
  if (new_password.length < 8)
    return res.status(400).send("Password cannot be less than 8 characters");
  let validPassword = await bcrypt.compare(curr_password, user.password);
  if (!validPassword)
    return res.status(400).send("Current password is not correct");
  validPassword = await bcrypt.compare(new_password, user.password);
  if (validPassword)
    return res.status(400).send("Current and New Password cannot be same");
  const salt = await bcrypt.genSalt(10);
  new_password = await bcrypt.hash(new_password, salt);
  user.password = new_password;
  res.send(await user.save());
});

router.put("/user/changename", auth, async (req, res) => {
  const filter = { email: req.body.email };
  const update = { username: req.body.username };
  const user = await User.findOneAndUpdate(filter, update, {
    useFindAndModify: false,
    new: true
  }, (err, docs) => {
    if (err)
      return res.status(500).send(err);
  });

  return res.send(user);
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
