const mongoose = require('mongoose');

const {Schema} = mongoose;

const tokenModel = new Schema({
  token: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId
  },
  expireDate: {
    type: Date
  },
  createdDate: {
    type: Date
  }
});

module.exports = mongoose.model('token', tokenModel);
