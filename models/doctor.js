// models/doctor.js
class Doctor {
    constructor(id, name, patients, prescriptions, analytics) {
      this.id = id;
      this.name = name;
      this.patients = patients; // Array of patient IDs
      this.prescriptions = prescriptions; // Array of prescription IDs
      this.analytics = analytics; // Object with stats
    }
  }
  
  module.exports = Doctor;
  