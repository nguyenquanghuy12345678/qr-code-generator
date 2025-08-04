mongoose.set('strictQuery', true);
const express = require('express');
const mongoose = require('mongoose');
const qrRoutes = require('./routes/qr_routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/qr', qrRoutes);

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});