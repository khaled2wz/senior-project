const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    userId: {
      type: String,
      unique: true,
      default: () => `user_${new Date().getTime()}`,
    },
    preferences: {
      interestTags: {
        type: [String],
        default: [],
      },
      accommodationType: {
        type: String,
        enum: ["hotel", "apartment", "villa"],
      },
      budgetRange: {
        min: { type: Number, min: 0 },
        max: { type: Number, min: 0 },
      },
      durationDays: {
        type: Number,
        min: 1,
      },
      role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      },
      profilePic: {
        type: String,
        default: null,
      },
    },
  },
  { timestamps: true }
);

// Password hashing middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", userSchema);