const mongoose = require('mongoose');

const {Schema} = mongoose;

const itemModel = new Schema({
  title: String,
  description: String,
  notes: String,
  time: String,
  length: Number,
  completed: { type: Boolean, default: false},
  scope: {
    type: String,
    enum: ['private', 'class'],
    default: 'private'
  }
});

module.exports = mongoose.model('item', itemModel);