const mongoose = require("mongoose");
const Joi = require("Joi");

const Idea = mongoose.model(
  "Idea",
  new mongoose.Schema({
    title: { type: String, required: true, minlength: 5 },
    description: String,
    tags: [String],
    date: { type: Date, default: Date.now },
  })
);

const ideaPostSchema = Joi.object({
  title: Joi.string().min(5).required(),
  description: Joi.string().required(),
});

exports.Idea = Idea;
exports.ideaPostSchema = ideaPostSchema;
