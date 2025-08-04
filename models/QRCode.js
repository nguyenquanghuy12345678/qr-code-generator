const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('QRCode', qrCodeSchema);