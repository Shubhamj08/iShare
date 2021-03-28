const auth = require("../middleware/auth-middle");
const express = require("express");
const router = express.Router();
const { Idea, ideaPostSchema } = require("../models/idea-model");
const { User } = require("../models/user-model");

async function addToDb(req, res) {
  const user = await User.findOne({ email: req.user.email });
  const idea = new Idea({
    title: req.body.title,
    description: req.body.description,
    user
  });
  await idea.save();
}

async function renderIdeas(req, res) {
  let ideas = await Idea.find();
  res.send(ideas);
}

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-auth-token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
  next();
});

router.put("/like", auth, async (req, res) => {
  try {
    const updatedIdea = await Idea.findByIdAndUpdate(req.body._id, {
      $push: { likes: req.user._id }
    }, {
      new: true,
      useFindAndModify: false
    });
    
    res.send(updatedIdea);
  } catch (ex) {
    console.log(ex);
  }
});

router.put("/dislike", auth, async (req, res) => {
  try {
    const updatedIdea = await Idea.findByIdAndUpdate(req.body._id, {
      $pull: { likes: req.user._id }
    }, {
      new: true
    });
    
    res.send(updatedIdea);
  } catch (ex) {
    console.log(ex);
  }
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
  const idea = await addToDb(req, res);
  res.send(idea);
});

module.exports = router;
