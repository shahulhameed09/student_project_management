const mongoose = require('mongoose');


const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  USN_OR_EID: {
    type: String,
    required: true
  },
  password1: {
    type: String,
    required: true
  },
  password2: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', Schema);

module.exports = User;
