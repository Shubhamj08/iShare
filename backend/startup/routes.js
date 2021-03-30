const express = require("express");
const ideas = require("../routes/ideas");
const users = require("../routes/users");
const auth = require("../routes/auth");

module.exports = function (app) {
    app.use(express.json());
    app.use("/api/ideas", ideas);
    app.use("/api/users", users);
    app.use("/api/auth", auth);
}