const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const emailRoutes = require('./routes/emailRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/', emailRoutes);

// MongoDB setup
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
