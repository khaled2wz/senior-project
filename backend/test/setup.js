const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User'); // Import User model
dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await User.deleteMany({}); // Ensure User model is cleaned up
});