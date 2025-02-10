const express = require('express');
const Duckling = require('../models/Duckling');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const ducklings = await Duckling.find();
    res.json(ducklings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { color, size, price, quantity } = req.body;
    const newDuckling = new Duckling({ color, size, price, quantity, isDeleted: false });
    await newDuckling.save();
    res.status(201).json({
      message: 'Duckling created!',
      id: newDuckling._id,
      newDuckling
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedDuckling = await Duckling.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDuckling) return res.status(404).json({ message: 'Duckling not found' });
    res.status(200).json(updatedDuckling);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedDuckling = await Duckling.findByIdAndDelete(req.params.id);
    if (!deletedDuckling) return res.status(404).json({ message: 'Duckling not found' });
    res.json({ message: 'Duckling deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
