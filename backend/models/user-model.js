const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const { Idea } = require("./idea-model");

const userSchemaForDB = new mongoose.Schema({
  username: { type: String, required: true, minlength: 4, maxlength: 20 },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: { type: String, required: true, minlength: 8, maxlength: 1024 },
  ideas: [{type: mongoose.Schema.Types.ObjectId, ref: "Idea"}]
});

userSchemaForDB.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { username: this.username, email: this.email, _id: this._id, ideas: this.ideas },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchemaForDB);

const userSchema = Joi.object({
  username: Joi.string().min(4).max(20).required(),
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().min(8).max(255).required(),
});

exports.User = User;
exports.userSchema = userSchema;
