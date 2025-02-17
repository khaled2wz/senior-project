const Activity = require('../models/Activity');

// ADD ACTIVITY: POST /api/activities
const addActivity = async (req, res) => {
  try {
    const { name, description, location, date } = req.body;

    // Validate required fields
    if (!name || !description || !location || !date) {
      return res.status(400).json({
        message: "All fields (name, description, location, and date) are required to add an activity.",
      });
    }

    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json({
      message: 'Activity added successfully',
      activity,
    });
  } catch (error) {
    console.error("Error adding activity:", error);
    res.status(500).json({
      message: "An error occurred while adding the activity. Please ensure all fields are correct and try again.",
      error: error.message,
    });
  }
};

// UPDATE ACTIVITY: PUT /api/activities/:id
const updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!activity) {
      return res.status(404).json({
        message: `Activity with ID '${req.params.id}' not found. Unable to update.`,
      });
    }

    res.status(200).json({
      message: `Activity '${activity.name}' updated successfully.`,
      activity,
    });
  } catch (error) {
    console.error(`Error updating activity with ID ${req.params.id}:`, error);
    res.status(500).json({
      message: `An error occurred while updating the activity. Please ensure the input data is valid.`,
      error: error.message,
    });
  }
};

// DELETE ACTIVITY: DELETE /api/activities/:id
const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);

    if (!activity) {
      return res.status(404).json({
        message: `Activity with ID '${req.params.id}' not found. Unable to delete.`,
      });
    }

    res.status(200).json({
      message: `Activity '${activity.name}' deleted successfully.`,
    });
  } catch (error) {
    console.error(`Error deleting activity with ID ${req.params.id}:`, error);
    res.status(500).json({
      message: "An error occurred while deleting the activity. Please try again later.",
      error: error.message,
    });
  }
};

// GET ACTIVITY BY NAME: GET /api/activities?name=:name
const getActivityByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({
        message: "Activity name is required to search for an activity.",
      });
    }

    const activity = await Activity.findOne({ name });

    if (!activity) {
      return res.status(404).json({
        message: `Activity with the name '${name}' not found.`,
      });
    }

    res.status(200).json(activity);
  } catch (error) {
    console.error(`Error retrieving activity with name ${req.query.name}:`, error);
    res.status(500).json({
      message: "An error occurred while retrieving the activity. Please try again later.",
      error: error.message,
    });
  }
};

module.exports = { addActivity, updateActivity, deleteActivity, getActivityByName };
