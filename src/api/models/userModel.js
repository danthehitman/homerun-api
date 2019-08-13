'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  firstName: {
    type: String,
    required: 'First name'
  },
  lastName: {
    type: String,
    required: 'Last name'
  },
  birthDate: {
    type: Date,
    required: 'Birthday'
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  type: {
    type: [{
      type: String,
      enum: ['teacher', 'student']
    }],
    default: ['teacher']
  }
});

module.exports = mongoose.model('Users', UserSchema);