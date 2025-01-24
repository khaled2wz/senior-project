const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      unique: true,
      default: () => `user_${new Date().getTime()}`, // Generates a unique ID
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Proceed if password isn't modified
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;