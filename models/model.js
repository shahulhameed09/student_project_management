let mongoose = require('mongoose');

let myschema = mongoose.Schema({
  BID: String,
  USN: String,
  Type: String,
  Subject: String,
  Name: String,
  Title: String,
  Guide: String,
  Operation: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  }
})

let mymodel = mongoose.model('table', myschema)

module.exports = mymodel;