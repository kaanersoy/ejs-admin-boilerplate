const mongoose = require('mongoose');

const User = new mongoose.Schema(
  {
    username: String,
    password: String
  },
  { timestamps: true }
);

module.exports = User;
