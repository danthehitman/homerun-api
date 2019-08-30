const mongoose = require('mongoose');

const {Schema} = mongoose;

const dayModel = new Schema({
  date: {
    type: Date,
    required: 'date is required'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId
  },
  type: {
    type: [{
      type: String,
      enum: ['teacher', 'student']
    }],
    default: ['teacher']
  }
});

module.exports = mongoose.model('day', dayModel);
