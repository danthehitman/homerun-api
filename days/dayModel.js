const mongoose = require('mongoose');

const {Schema} = mongoose;

const dayModel = new Schema({
  date: {
    type: Date,
    required: 'date is required'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'userId is required'
  },
  notes: {
    type: String
  },
  items:[{
      title: String,
      description: String,
      notes: String,
      time: String,
      scope: {
        type: String,
        enum: ['private', 'class'],
        default: 'private'
      }
    }]
});

module.exports = mongoose.model('day', dayModel);
