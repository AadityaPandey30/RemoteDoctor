// routes/analytics.js
const express = require('express');
const db = require('../firebase');

const router = express.Router();

// Get analytics for a doctor
router.get('/:doctorId', async (req, res) => {
  try {
    const { doctorId } = req.params;

    const patientsSnapshot = await db.collection('patients').where('doctorId', '==', doctorId).get();
    const appointmentsSnapshot = await db.collection('appointments').where('doctorId', '==', doctorId).get();

    const analytics = {
      totalPatients: patientsSnapshot.size,
      totalAppointments: appointmentsSnapshot.size,
    };

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
