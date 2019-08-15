'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
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
  email: {
    type: String,
    required: 'Email'
  },
  password: {
    type: String,
    required: 'password'
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

userSchema.query.byEmail = function (email) {
  return this.where({'email' : new RegExp(email, 'i')})
};

module.exports = mongoose.model('user', userSchema);