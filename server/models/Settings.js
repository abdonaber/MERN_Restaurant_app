const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    default: 'FastFeast'
  },
  isOpen: {
    type: Boolean,
    default: true
  },
  taxRate: {
    type: Number,
    default: 0.1 // 10%
  },
  deliveryFee: {
    type: Number,
    default: 5
  },
  minimumOrder: {
    type: Number,
    default: 10
  }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
