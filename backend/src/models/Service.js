const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  subDescription: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  link: {
    type: String,
    unique: true,
    default: '',
  }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);