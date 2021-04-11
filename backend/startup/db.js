const mongoose = require("mongoose");

module.exports = function () {
    mongoose
        .connect("mongodb://localhost:27017/ishare", {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        .then(() => console.log("connected to MongoDb"))
        .catch((err) => console.error(`could not connect to mongoDB... err: ${err}`));
}