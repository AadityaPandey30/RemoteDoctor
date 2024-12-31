// models/patient.js
class Patient {
    constructor(patientId, name, age, medicalHistory, doctorId, appointments) {
      this.patientId = patientId;
      this.name = name;
      this.age = age;
      this.medicalHistory = medicalHistory; 
      this.doctorId = doctorId;
      this.appointments = appointments; // Array of appointment IDs
    }
  }
  
  module.exports = Patient;