const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User, userSchema } = require("../models/user-model");

function addToDb(req, res) {
  const idea = new Idea({
    title: req.body.title,
    description: req.body.description,
  });
  const dbSaveResult = idea.save();
}

function addUserToDb(req, res) {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  const dbSaveResult = user.save();

  return user;
}

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.post("/", async (req, res) => {
  const result = userSchema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  let userAlreadyExists = await User.findOne({ email: req.body.email });
  if (userAlreadyExists) {
    return res.status(400).send("User already registered");
  }
  const user = addUserToDb(req, res);
  res.send(user);
});

module.exports = router;
