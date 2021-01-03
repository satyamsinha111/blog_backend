const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://satyam:12345@cluster0.gdwts.mongodb.net/blogApp?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
module.exports = mongoose.connection;
