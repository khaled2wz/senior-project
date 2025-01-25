const serviceSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Service name is required"],
        trim: true,
      },
      type: {
        type: String,
        required: true,
        enum: ["hotel", "restaurant", "transport"],
      },
      locationCity: {
        type: String,
        required: true,
        enum: ["Riyadh", "Jeddah", "Mecca", "Medina", "Al-Ula"],
      },
      geo: {
        type: {
          type: String,
          default: "Point",
          enum: ["Point"],
        },
        coordinates: [Number],
      },
      priceRange: {
        type: String,
        enum: ["$", "$$", "$$$", "$$$$"],
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
    { timestamps: true }
  );
  
  // Geospatial index
  serviceSchema.index({ geo: "2dsphere" });
  
  module.exports = mongoose.model("Service", serviceSchema);