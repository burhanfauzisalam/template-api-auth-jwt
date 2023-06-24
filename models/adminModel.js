const mongoose = require("mongoose");

const dataAdmin = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
    // select: false,
  },
  email: {
    required: true,
    type: String,
  },
  wa: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("admin", dataAdmin);
