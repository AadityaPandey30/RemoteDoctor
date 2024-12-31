// app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import Routes
const appointmentsRoutes = require('./routes/appointments');
const analyticsRoutes = require('./routes/analytics');
const patientsRoutes = require('./routes/patients');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/patients', patientsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
