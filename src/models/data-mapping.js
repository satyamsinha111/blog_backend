const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mapping_schema = new schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
});

module.exports = mongoose.model("Mapping", mapping_schema);
