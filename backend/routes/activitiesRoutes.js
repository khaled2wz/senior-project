const express = require('express');
const router = express.Router();
const { addActivity, updateActivity, deleteActivity, getActivityByName } = require('../controllers/activitiesController');
const Activity = require('../models/Activity');

// POST /api/activities
router.post('/', addActivity);

// GET /api/activities
router.get('/', async (req, res) => {
  try {
    const { locationCity, type } = req.query;
    let query = {};
    if (locationCity) {
      query.locationCity = locationCity;
    }
    if (type) {
      query.type = { $in: type.split(',') };
    }
    const activities = await Activity.find(query);
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/activities/:id
router.get('/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/activities/search
router.get('/search', getActivityByName);

// PUT /api/activities/:id
router.put('/:id', updateActivity);

// DELETE /api/activities/:id
router.delete('/:id', deleteActivity);

module.exports = router;