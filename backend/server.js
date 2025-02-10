require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

mongoose
  .connect('mongodb://127.0.0.1:27017/test-dh')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.use('/api/ducklings', require('./routes/ducklingRoutes'));

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
