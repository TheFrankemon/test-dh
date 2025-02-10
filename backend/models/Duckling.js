const mongoose = require('mongoose');

const ducklingSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  isDeleted: { type: Boolean, required: false },
});

module.exports = mongoose.model('Duckling', ducklingSchema);
