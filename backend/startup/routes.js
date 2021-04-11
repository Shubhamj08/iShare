const express = require("express");
const ideas = require("../routes/ideas");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
    app.use(express.json());
    app.use("/api/ideas", ideas);
    app.use("/api/users", users);
    app.use("/api/auth", auth);
    app.get("/", (req, res) => {
        res.send("ISHARE Backend server");
    });
    app.get("/api", (req, res) => {
        res.send("Use /ideas, /users, /auth endpoints");
    });
    app.use(error);
}