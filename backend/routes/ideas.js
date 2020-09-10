const auth = require("../middleware/auth-middle");
const express = require("express");
const router = express.Router();
const { Idea, ideaPostSchema } = require("../models/idea-model");

async function addToDb(req, res) {
  const idea = new Idea({
    title: req.body.title,
    description: req.body.description,
  });
  await idea.save();
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

router.post("/", auth, async (req, res) => {
  const result = ideaPostSchema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  await addToDb(req, res);
  renderIdeas(req, res);
});

module.exports = router;
