const mongoose = require("mongoose");
const Joi = require("joi");

const Idea = mongoose.model(
  "Idea",
  new mongoose.Schema({
    title: { type: String, required: true, minlength: 5 },
    description: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
  })
);

const ideaPostSchema = Joi.object({
  title: Joi.string().min(5).required(),
  description: Joi.string().required(),
});

exports.Idea = Idea;
exports.ideaPostSchema = ideaPostSchema;
