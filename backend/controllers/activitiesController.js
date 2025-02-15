const Activity = require('../models/Activity');
const City = require('../models/City');

const addActivity = async (req, res) => {
  try {
    const city = await City.findById(req.body.city);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json({ message: 'Activity added successfully', activity });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateActivity = async (req, res) => {
  try {
    const city = await City.findById(req.body.city);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

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
    const activity = await Activity.findOne({ name: req.query.name }).populate('city');
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

const getCategoriesAndTypes = async (req, res) => {
  try {
    const categories = Activity.schema.path('categories').options.enum;
    const types = Activity.schema.path('type').options.enum;
    res.json({ categories, types });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addActivity, updateActivity, deleteActivity, getActivityByName, getCategoriesAndTypes };