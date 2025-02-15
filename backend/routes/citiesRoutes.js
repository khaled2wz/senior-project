const express = require('express');
const router = express.Router();
const City = require('../models/City');

// GET /api/cities
router.get('/', async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;