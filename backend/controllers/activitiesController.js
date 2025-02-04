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

const updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json({ message: 'Activity updated successfully', activity });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getActivityByName = async (req, res) => {
  try {
    const activity = await Activity.findOne({ name: req.query.name });
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addActivity, updateActivity, deleteActivity, getActivityByName };