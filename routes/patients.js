// routes/patients.js
const express = require('express');
const db = require('../firebase');

const router = express.Router();

// Get all patients for a doctor
router.get('/:doctorId', async (req, res) => {
  try {
    const { doctorId } = req.params;
    const patientsRef = db.collection('patients');
    const snapshot = await patientsRef.where('doctorId', '==', doctorId).get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'No patients found' });
    }

    const patients = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new patient
router.post('/', async (req, res) => {
  try {
    const { name, age, medicalHistory, doctorId } = req.body;

    const newPatient = {
      name,
      age,
      medicalHistory: medicalHistory || [],
      doctorId,
      appointments: [],
    };

    const patientRef = await db.collection('patients').add(newPatient);
    res.status(201).json({ id: patientRef.id, ...newPatient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:doctorId/:patientId', async (req, res) => {
    try {
      const { doctorId, patientId } = req.params;
  
      // Fetch patient document by ID
      const patientRef = db.collection('patients').doc(patientId);
      const doc = await patientRef.get();
  
      if (!doc.exists) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      const patientData = doc.data();
  
      // Authorization check: Ensure patient belongs to the specified doctor
      if (patientData.doctorId !== doctorId) {
        return res.status(403).json({ message: 'Unauthorized access to patient data' });
      }
  
      // Include the document ID (patientId) in the response
      res.json({ id: doc.id, ...patientData });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
