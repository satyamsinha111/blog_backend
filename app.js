const { request } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const appModules = require("./src");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

appModules.utils.db.on(
  "error",
  console.error.bind(console, "connection error:")
);
appModules.utils.db.once("open", function () {
  // we're connected!
  console.log("Database is connected to server");
});

app.use("/api/", appModules.routes.blog);
app.use("/api/", appModules.routes.users);
app.listen(PORT, () => {
  console.log(`Listning at port ${PORT}`);
});
