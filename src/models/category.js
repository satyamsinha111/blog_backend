const mongoose = require("mongoose");

const schema = mongoose.Schema;

const category_schema = new schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", category_schema);
