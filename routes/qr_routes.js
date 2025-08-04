const express = require('express');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');
const QRCodeModel = require('../models/QRCode');

const router = express.Router();

// Tạo mã QR
router.post('/generate', async (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({ error: 'Data is required' });
  }

  try {
    // Tạo mã QR dưới dạng base64
    const qrImage = await QRCode.toDataURL(data);
    const fileName = `${uuidv4()}.png`;

    // Lưu vào MongoDB
    const qrCode = new QRCodeModel({ data, fileName });
    await qrCode.save();

    res.json({ qrImage, fileName, data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

// Lấy lịch sử mã QR
router.get('/history', async (req, res) => {
  try {
    const qrCodes = await QRCodeModel.find().sort({ createdAt: -1 });
    res.json(qrCodes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch QR code history' });
  }
});

module.exports = router;