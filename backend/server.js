const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

const corsOptions ={
  origin:'*', 
  credentials:true,            
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/activities', require('./routes/activitiesRoutes'));
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Root Route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));