const Activity = require('../models/Activity');

const addActivity = async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json({ message: 'Activity added successfully', activity });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addActivity };