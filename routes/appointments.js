// routes/appointments.js
const express = require('express');
const db = require('../firebase');

const router = express.Router();

// Get all appointments for a doctor
router.get('/:doctorId', async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointmentsRef = db.collection('appointments');
    const snapshot = await appointmentsRef.where('doctorId', '==', doctorId).get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'No appointments found' });
    }

    const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Schedule a new appointment
router.post('/', async (req, res) => {
  try {
    const { patientId, doctorId, date, reason } = req.body;

    const newAppointment = {
      patientId,
      doctorId,
      date,
      reason,
    };

    const appointmentRef = await db.collection('appointments').add(newAppointment);
    res.status(201).json({ id: appointmentRef.id, ...newAppointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
