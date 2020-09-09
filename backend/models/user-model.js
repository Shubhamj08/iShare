const mongoose = require("mongoose");
const Joi = require("Joi");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: { type: String, required: true, minlength: 5, maxlength: 20 },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: { type: String, required: true, minlength: 8, maxlength: 1024 },
  })
);

const userSchema = Joi.object({
  username: Joi.string().min(5).max(20).required(),
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().min(8).max(255).required(),
});

exports.User = User;
exports.userSchema = userSchema;
