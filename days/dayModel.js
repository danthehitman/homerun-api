const mongoose = require('mongoose');

const {Schema} = mongoose;

const dayModel = new Schema({
  date: {
    type: Date,
    required: 'date is required'
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: 'userId is required'
  },
  notes: {
    type: String
  },
  items:[{type: Schema.Types.ObjectId, ref: 'Item'}]
});

module.exports = mongoose.model('day', dayModel);
