const mongoose = require('mongoose');

const requiredNumber = {
  type: Number,
  required: true,
};

const logEntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  comments: String,
  image: String,
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  latitude: {
    ...requiredNumber,
    min: -89.9999999999999999,
    max: 89.99999999999999999,
  },
  longitude: {
    ...requiredNumber,
    min: -179.9999999999999999,
    max: 179.99999999999999999,
  },
  visitDate: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;
