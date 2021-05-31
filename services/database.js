const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

module.exports = class {
  constructor() {
    this.createConnection();
    this.connection = mongoose.connection;
    this.User = mongoose.model('User', User);
  }
  createConnection() {
    if (this.connection) {
      return mongoose.connection;
    }
    const connectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    mongoose.connect(process.env.MONGODB_URI, connectionOptions);
  }

  createUser(user) {
    const newUser = new this.User(user);
    return newUser.save();
  }

  async checkUserExists(user) {
    const isExists = await this.User.findOne(user);
    if (isExists) {
      return true;
    }
    return false;
  }
};
