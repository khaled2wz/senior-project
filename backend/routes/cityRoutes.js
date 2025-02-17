const express = require("express");
const router = express.Router();

const cityController = require("../controllers/cityController");
const { protect, admin } = require("../middleware/authMiddleware");

// Public routes (if you want cities to be visible to all users)
router.get("/", cityController.getAllCities);
router.get("/names", cityController.getAllCityNames);
router.get("/:name", cityController.getCityByName);

// Admin-only routes
router.post("/", protect, admin, cityController.createCity);
router.put("/:name", protect, admin, cityController.updateCityByName);
router.delete("/:name", protect, admin, cityController.deleteCityByName);

module.exports = router;