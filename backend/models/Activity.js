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
    locationCity: {
      type: String,
      required: [true, "City is required"],
      enum: ["Riyadh", "Jeddah", "Mecca", "Medina", "Al-Ula", "Khobar", "Dammam", "Abha", "Neom","Tabuk","Qassim","Hail","Jizan","Najran","Taif","Al-Baha","Jubail","Hafr Al-Batin","Arar","Sakaka","Al-Ahsa","Al-Kharj","Al-Ghat"],
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