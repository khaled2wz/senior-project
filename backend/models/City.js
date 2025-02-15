const mongoose = require('mongoose');

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "City name is required"],
      enum: ["Riyadh", "Jeddah", "Mecca", "Medina", 
             "Al-Ula", "Khobar", "Dammam", "Abha", 
             "Neom", "Tabuk", "Qassim", "Hail", "Jizan",
             "Najran", "Taif", "Al-Baha", "Jubail", "Hafr Al-Batin", 
             "Arar", "Sakaka", "Al-Ahsa", "Al-Kharj", "Al-Ghat"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    population: {
      type: Number,
      required: [true, "Population is required"],
    },
    attractions: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("City", citySchema);