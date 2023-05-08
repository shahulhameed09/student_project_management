let mongoose = require('mongoose');

let Evaluateschema = mongoose.Schema({
  BID: String,
  EID: String,
  Domain: String,
  Achievement: String,
  PO: String,
  PSO: String,
  Justification: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  }
})

let Evaluatemodel = mongoose.model('Evaluate', Evaluateschema)

module.exports = Evaluatemodel;