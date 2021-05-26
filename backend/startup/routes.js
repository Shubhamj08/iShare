const express = require("express");
const ideas = require("../routes/ideas");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
    app.set('view engine', 'pug');
    app.set('views', './views');
    app.use(express.json());
    app.use("/api/ideas", ideas);
    app.use("/api/users", users);
    app.use("/api/auth", auth);
    app.get("/", (req, res) => {
        res.render('serverpage');
    });
    app.get("/api", (req, res) => {
        res.render('apipage');
    });
    app.use(error);
}