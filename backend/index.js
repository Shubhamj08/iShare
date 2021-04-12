require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");
const express = require("express");
const app = express();
const config = require("config");

winston.exceptions.handle(
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
);
process.on('unhandledRejection', (ex) => {
    throw ex;
});

winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(new winston.transports.MongoDB({
    db: `mongodb+srv://shubham:${config.get("mongoDbUrl")}@isharedb.d6ql0.mongodb.net/ishare?retryWrites=true&w=majority`,
    level: 'error'
}));

require("./startup/config")();
require("./startup/db")();
require("./startup/routes")(app);
require("./startup/prod")(app);

app.listen(process.env.PORT || 80, '0.0.0.0', () => console.log(`listening on port ${process.env.PORT || 3000}...`));
