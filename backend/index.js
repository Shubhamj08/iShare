const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
require("./startup/config")();
require("./startup/db")();
require("./startup/routes")(app);
require("./startup/prod")(app);

app.listen(3000, () => console.log("listening on port 3000..."));
