const config = require("config");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../models/user-model");

const userSchema = Joi.object({
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().min(8).max(255).required(),
});

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-auth-token"
  );
  next();
});

router.post("/", async (req, res) => {
  const result = userSchema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid email or password!");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid email or password!");
  }

  const token = user.generateAuthToken();
  res.send(token);
});

module.exports = router;
