const mongoose = require('mongoose');

const {Schema} = mongoose;

const userModel = new Schema({
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
  username: {
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

module.exports = mongoose.model('user', userModel);
