require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");
const express = require("express");
const app = express();

winston.exceptions.handle(
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
);
process.on('unhandledRejection', (ex) => {
    throw ex;
});

winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(new winston.transports.MongoDB({
    db: 'mongodb://localhost:27017/ishare',
    level: 'error'
}));

require("./startup/config")();
require("./startup/db")();
require("./startup/routes")(app);
require("./startup/prod")(app);

app.listen(3000, () => console.log("listening on port 3000..."));
