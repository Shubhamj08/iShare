const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Idea = mongoose.model(
  "Idea",
  new mongoose.Schema({
    title: { type: String, required: true, minlength: 5 },
    description: String,
    tags: [String],
    date: { type: Date, default: Date.now },
  })
);

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get("/", async (req, res) => {
  const ideas = await Idea.find();
  res.render("ideas", {
    ideas: ideas,
  });
});

module.exports = router;
