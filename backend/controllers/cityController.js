// backend/controllers/cityController.js
const City = require("../models/City");

// CREATE: POST /api/cities
exports.createCity = async (req, res) => {
  try {
    const { name, description, pictures } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        message: "Both 'name' and 'description' fields are required to create a city.",
      });
    }
    const newCity = await City.create({ name, description, pictures });
    return res.status(201).json({
      message: "City created successfully",
      city: newCity,
    });
  } catch (error) {
    console.error("Error creating city:", error);
    return res.status(500).json({
      message: "An error occurred while creating the city. Please check your input data and try again.",
      error: error.message,
    });
  }
};

// GET ALL CITIES: GET /api/cities
exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    return res.status(200).json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    return res.status(500).json({
      message: "Failed to retrieve cities. Please try again later.",
      error: error.message,
    });
  }
};

// GET ALL CITY NAMES: GET /api/cities/names
exports.getAllCityNames = async (req, res) => {
  try {
    const cities = await City.find({}, 'name');
    const cityNames = cities.map(city => city.name);
    return res.status(200).json({ cityNames });
  } catch (error) {
    console.error("Error fetching city names:", error);
    return res.status(500).json({
      message: "Failed to retrieve city names. Please try again later.",
      error: error.message,
    });
  }
};

// GET (single city by name): GET /api/cities/:name
exports.getCityByName = async (req, res) => {
  try {
    const { name } = req.params;
    const city = await City.findOne({ name });
    if (!city) {
      return res.status(404).json({
        message: `City with the name '${name}' was not found.`,
      });
    }
    return res.status(200).json({ city });
  } catch (error) {
    console.error(`Error fetching city with name ${req.params.name}:`, error);
    return res.status(500).json({
      message: `An error occurred while retrieving the city '${req.params.name}'. Please try again later.`,
      error: error.message,
    });
  }
};

// UPDATE: PUT /api/cities/:name
exports.updateCityByName = async (req, res) => {
  try {
    const { name } = req.params;
    const { description, pictures } = req.body;
    const city = await City.findOneAndUpdate(
      { name },
      { description, pictures },
      { new: true, runValidators: true }
    );
    if (!city) {
      return res.status(404).json({
        message: `City with the name '${name}' was not found. Unable to update.`,
      });
    }
    return res.status(200).json({
      message: `City '${name}' updated successfully.`,
      city,
    });
  } catch (error) {
    console.error(`Error updating city '${req.params.name}':`, error);
    return res.status(500).json({
      message: `An error occurred while updating the city '${req.params.name}'. Please ensure your input is valid.`,
      error: error.message,
    });
  }
};

// DELETE: DELETE /api/cities/:name
exports.deleteCityByName = async (req, res) => {
  try {
    const { name } = req.params;
    const city = await City.findOneAndDelete({ name });
    if (!city) {
      return res.status(404).json({
        message: `City with the name '${name}' was not found. Unable to delete.`,
      });
    }
    return res.status(200).json({
      message: `City '${name}' deleted successfully.`,
    });
  } catch (error) {
    console.error(`Error deleting city '${req.params.name}':`, error);
    return res.status(500).json({
      message: `An error occurred while deleting the city '${req.params.name}'. Please try again later.`,
      error: error.message,
    });
  }
};