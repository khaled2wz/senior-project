const express = require('express');
const router = express.Router();
const { addActivity } = require('../controllers/activitiesController');
const Activity = require('../models/Activity');

// POST /api/activities
router.post('/', addActivity);

// GET /api/activities
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;