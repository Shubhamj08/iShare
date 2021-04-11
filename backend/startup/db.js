const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
    mongoose
        .connect(config.get("mongoDbUrl"), {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        .then(() => console.log("connected to MongoDb"))
        .catch((err) => console.error(`could not connect to mongoDB... err: ${err}`));
}