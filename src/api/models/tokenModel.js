'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TokenSchema = new Schema({
  token: {
    type: String
  },
  userId: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('token', TokenSchema);