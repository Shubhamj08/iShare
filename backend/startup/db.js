const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
    mongoose
        .connect(`mongodb+srv://shubham:${config.get("mongoDbUrl")}@isharedb.d6ql0.mongodb.net/ishare`, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        .then(() => console.log("connected to mongoDB"))
        .catch((err) => console.error(`could not connect to mongoDB... err: ${err}`));
}