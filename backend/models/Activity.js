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
        enum: ["Riyadh", "Jeddah", "Mecca", "Medina", "Al-Ula"],
      },
      geo: {
        type: {
          type: String,
          default: "Point",
          enum: ["Point"],
        },
        coordinates: [Number], // [longitude, latitude]
      },
      type: {
        type: String,
        required: true,
        enum: ["Historical","Adventure", "Cultural","Experiences","Theater and arts","Concerts","Sports","Food","Music"],
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
        enum: ["Family-friendly", "Outdoor", "Luxury", "Budget","Solo-traveler","Group-traveler","Indoor"],
      },
    },
    { timestamps: true }
  );
  
  // Geospatial index for proximity queries
  activitySchema.index({ geo: "2dsphere" });
  
  module.exports = mongoose.model("Activity", activitySchema);