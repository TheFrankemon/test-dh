const express = require('express');
const router = express.Router();
const Duckling = require('../models/Duckling');
const { getPackagingType, getShippingPrice } = require('../helpers/ducklingOrderHelper');

// curl -X GET http://localhost:5001/api/ducklings
router.get('/', async (req, res) => {
  try {
    const ducklings = (await Duckling.find().sort({ quantity: -1 })).filter(el => !el.isDeleted);
    res.json(ducklings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// curl -X POST http://localhost:5001/api/ducklings -H "Content-Type: application/json" -d '{"color": "red", "size": "small", "price": 30, "quantity": 2 }'
router.post('/', async (req, res) => {
  try {
    const { color, size, price, quantity } = req.body;

    const existingDuckling = await Duckling.findOne({ color, size, price });

    if (existingDuckling) {
      existingDuckling.quantity += quantity;
      const updatedDuckling = await existingDuckling.save();
      req.io.emit("itemUpdated");
      return res.status(200).json(updatedDuckling);
    } else {
      const newDuckling = new Duckling({ color, size, price, quantity, isDeleted: false });
      await newDuckling.save();
      req.io.emit("itemUpdated");
      res.status(201).json({
        message: 'Duckling created!',
        id: newDuckling._id,
        newDuckling
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// curl -X PUT http://localhost:5001/api/ducklings/67aa60c649f30f946dda8c28 -H "Content-Type: application/json" -d '{"color": "blue", "size": "medium", "price": 50, "quantity": 2 }'
router.put('/:id', async (req, res) => {
  try {
    const updatedDuckling = await Duckling.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDuckling) return res.status(404).json({ message: 'Duckling not found' });
    req.io.emit("itemUpdated");
    res.status(200).json(updatedDuckling);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// curl -X DELETE http://localhost:5001/api/ducklings/67aa60c649f30f946dda8c28
router.delete('/:id', async (req, res) => {
  try {
    const deletedDuckling = await Duckling.findByIdAndDelete(req.params.id);
    if (!deletedDuckling) return res.status(404).json({ message: 'Duckling not found' });
    req.io.emit("itemUpdated");
    res.json({ message: 'Duckling deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// soft delete
// curl -X PUT http://localhost:5001/api/ducklings/delete/67aa60c649f30f946dda8c28
router.put('/delete/:id', async (req, res) => {
  try {
    const duckling = await Duckling.findById(req.params.id);
    if (!duckling) {
      return res.status(404).json({ message: 'Duckling not found' });
    }

    const updatedDuckling = await Duckling.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    req.io.emit("itemUpdated");
    res.status(200).json(updatedDuckling);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// curl -X GET http://localhost:4000/api/ducklings/ducklingOrder -H "Content-Type: application/json" -d '{ "duckling": {"color": "Rojo", "size": "Medium", "price": 50, "quantity": 2 }, "destination": "India", "shippingMethod": "land" }'
router.get('/ducklingOrder', async (req, res) => {
  try {
    const { duckling, destination, shippingMethod } = req.body;
    const { size, price, quantity } = duckling;

    const { packageMaterial, packageFilling } = getPackagingType(size, shippingMethod);
    const { subtotal, additionalCosts, discounts } = getShippingPrice(destination, shippingMethod, quantity, price, packageMaterial);

    const orderPrice = subtotal + additionalCosts - discounts;
    const order = {
      packageMaterial,
      packageFilling,
      orderPrice,
      otherAmounts: {
        additionalCosts,
        discounts
      }
    };

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
