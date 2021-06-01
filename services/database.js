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

  async createUser(user) {
    const isExists = await this.checkUserExists({ username: user.username });
    if (isExists) return { error: true, message: 'User is exists' };
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

  async getUserByUsername() {
    const user = this.User.findOne({ username: user.username });
    if (user.username) {
      return user;
    }
    return {
      error: true,
      message: 'User is not found'
    };
  }
};
