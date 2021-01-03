const mongoose = require("mongoose");

const schema = mongoose.Schema;

const blog_schema = new schema(
  {
    name: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blog_schema);
