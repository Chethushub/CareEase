const initialData = {
  appointments: {
    weeks: [5, 8, 6, 7, 10, 4, 9],
    months: [30, 28, 32, 25, 40, 35, 45, 38, 42, 47, 39, 41],
  },
  bills: {
    weeks: [
      { patientName: 'John Doe', amount: 200, date: '2024-11-1' },
      { patientName: 'Jane Smith', amount: 150, date: '2024-11-13' },
      { patientName: 'Mark Taylor', amount: 120, date: '2024-11-12' },
    ],
    months: [
      { patientName: 'Emily Stone', amount: 450, date: '2024-10-14' },
      { patientName: 'Paul Harris', amount: 600, date: '2024-01-10' },
      { patientName: 'Anna Brown', amount: 350, date: '2024-08-22' },
    ],
  },
  treatments: [
    { name: 'Scaling & Polishing', rating: 4.7 },
    { name: 'Tooth Extraction', rating: 4.4 },
    { name: 'General Checkup', rating: 4.6 },
  ],
  bedOccupancy: [
    { name: 'Available', value: 60 },
    { name: 'Low Stock', value: 30 },
    { name: 'Out of Stock', value: 10 },
  ],
  patientDepartments: [
    { name: 'Cardiology', visits: 35 },
    { name: 'Neurology', visits: 10 },
    { name: 'Orthopedics', visits: 40 },
    { name: 'Pediatrics', visits: 50 },
    { name: 'Dermatology', visits: 25 }
  ],
  newPatients: [
    { patientName: 'Alice Brown', firstVisit: true },
    { patientName: 'Alice Brown', firstVisit: true },
    { patientName: 'Alice Brown', firstVisit: true },
    { patientName: 'Alice Brown', firstVisit: true },
    { patientName: 'Robert Johnson', firstVisit: false },
    { patientName: 'Robert Johnson', firstVisit: false },
    { patientName: 'Robert Johnson', firstVisit: false },
    { patientName: 'Robert Johnson', firstVisit: false },
    { patientName: 'Robert Johnson', firstVisit: false },
    { patientName: 'Robert Johnson', firstVisit: false },
    { patientName: 'Robert Johnson', firstVisit: false },
    { patientName: 'Robert Johnson', firstVisit: false },
    { patientName: 'Robert Johnson', firstVisit: false },
    { patientName: 'Robert Johnson', firstVisit: false },
    { patientName: 'Robert Johnson', firstVisit: false },
    { patientName: 'Robert Johnson', firstVisit: false },
  ],
};

export default initialData;
