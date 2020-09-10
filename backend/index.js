const config = require("config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ideas = require("./routes/ideas");
const users = require("./routes/users");
const auth = require("./routes/auth");
const { request } = require("express");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey no defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost:27017/ideas")
  .then(() => console.log("connected to MongoDb"))
  .catch((err) => console.error(`could not connect to mongoDB... err: ${err}`));

app.use(express.json());
app.use("/api/ideas", ideas);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.set("view engine", "pug");
app.set("views", "./views");

app.listen(3000, () => console.log("listening on port 3000..."));
