const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ideas = require("./routes/ideas");

mongoose
  .connect("mongodb://localhost:27017/ideas")
  .then(() => console.log("connected to MongoDb"))
  .catch((err) => console.error(`could not connect to mongoDB... err: ${err}`));

app.use(express.json());
app.use("/api/ideas", ideas);

app.set("view engine", "pug");
app.set("views", "./views");

app.listen(3000, () => console.log("listening on port 3000..."));
