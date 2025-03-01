const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const cityRoutes = require("./routes/cityRoutes");
const userRoutes = require("./routes/userRoutes");
const activitiesRoutes = require("./routes/activitiesRoutes");
const aboutRoutes = require('./routes/aboutRoutes'); 
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/activities', activitiesRoutes);
app.use("/api/cities", cityRoutes);
app.use('/api/about', aboutRoutes);


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root Route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = { app };