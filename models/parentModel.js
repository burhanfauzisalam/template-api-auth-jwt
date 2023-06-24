const mongoose = require("mongoose");

const dataParent = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  address: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  wa: {
    required: true,
    type: Number,
  },
  children: [],
});

module.exports = mongoose.model("parent", dataParent);
