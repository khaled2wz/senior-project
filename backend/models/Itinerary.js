const itinerarySchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User reference is required"],
      },
      startDate: {
        type: Date,
        required: [true, "Start date is required"],
      },
      endDate: {
        type: Date,
        required: [true, "End date is required"],
      },
      baseLocation: {
        type: String,
        required: [true, "Base location is required"],
      },
      status: {
        type: String,
        enum: ["draft", "confirmed", "completed"],
        default: "draft",
      },
      activities: [
        {
          activity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Activity",
            required: true,
          },
          dayNumber: {
            type: Number,
            min: 1,
            required: true,
          },
          startTime: String,
          notes: String,
        },
      ],
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Itinerary", itinerarySchema);