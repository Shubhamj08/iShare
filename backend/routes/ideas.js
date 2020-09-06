const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");

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

function addToDb(req, res) {
  const idea = new Idea({
    title: req.body.title,
    description: req.body.description,
  });
  const dbSaveResult = idea.save();
}

async function renderIdeas(req, res) {
  let ideas = await Idea.find();
  res.render("ideas", {
    ideas: ideas,
  });
}

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get("/", async (req, res) => {
  renderIdeas(req, res);
});

router.post("/", async (req, res) => {
  const result = ideaPostSchema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error);
    return;
  }
  addToDb(req, res);
  renderIdeas(req, res);
});

module.exports = router;
