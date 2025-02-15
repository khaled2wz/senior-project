const express = require('express');
const router = express.Router();
const { addActivity, updateActivity, deleteActivity, getActivityByName, getCategoriesAndTypes } = require('../controllers/activitiesController');
const { protect, admin } = require('../middleware/authMiddleware');
const Activity = require('../models/Activity');  

// POST /api/activities
router.post('/', protect, admin, addActivity);

// GET /api/activities
router.get('/', async (req, res) => {
  try {
    const { city, type } = req.query;
    let query = {};
    if (city) {
      query.city = city;
    }
    if (type) {
      query.type = { $in: type.split(',') };
    }
    const activities = await Activity.find(query).populate('city');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/activities/search
router.get('/search', getActivityByName);

// GET /api/activities/categories-and-types
router.get('/categories-and-types', getCategoriesAndTypes);

// GET /api/activities/:id
router.get('/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('city');
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/activities/:id
router.put('/:id', protect, admin, updateActivity);

// DELETE /api/activities/:id
router.delete('/:id', protect, admin, deleteActivity);

module.exports = router;