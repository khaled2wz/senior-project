const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Activity name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: [true, "City is required"],
    },
    type: {
      type: [String],
      required: true,
      enum: ["Historical", "Adventure", "Cultural", "Experiences", "Theater and arts", "Concerts", "Sports", "Food", "Music"],
    },
    cost: {
      type: Number,
      min: 0,
    },
    durationHours: {
      type: Number,
      min: 1,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    categories: {
      type: [String],
      enum: ["Family-friendly", "Outdoor", "Luxury", "Budget", "Solo-traveler", "Group-traveler", "Indoor"],
    },
    pictureUrl: {
      type: String,
      required: [true, "Picture URL is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);