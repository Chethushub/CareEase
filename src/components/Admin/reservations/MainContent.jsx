import React, { useState } from 'react';

// Sample data with date, patient problem, and expanded patient information
const initialAppointments = [
  { doctor: 'Dr. Shekar Nayak', patient: 'Patient 1', time: '9:00 AM', date: '2024-11-10', type: 'General Checkup', problem: 'Headache', status: 'Finished' },
  { doctor: 'Dr. Shekar Nayak', patient: 'Patient 2', time: '10:00 AM', date: '2024-11-10', type: 'General Checkup', problem: 'Fever', status: 'Doing Treatment' },
  { doctor: 'Dr. John Doe', patient: 'Patient 3', time: '11:00 AM', date: '2024-11-10', type: 'General Checkup', problem: 'Cold', status: 'Registered' },
];

// Available one-hour time slots
const timeslots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
];

// Header component with filter functionality
const Header = ({ date, onPreviousDate, onNextDate, totalReservations, onFilterChange }) => (
  <div className="bg-100 p-4 flex flex-col space-y-2">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-black">Calendar</h2>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <img src="./icons/reservation.svg" alt="Reservations" className="mr-2" />
        <span className="text-lg font-semibold text-gray-700"> Reservations: {totalReservations} </span>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={onPreviousDate}>&lt;</button>
        <span className="text-gray-700">{date.toDateString()}</span>
        <button onClick={onNextDate}>&gt;</button>
        <select className="border border-gray-300 rounded-md p-2 bg-white text-gray-700" onChange={(e) => onFilterChange('doctor', e.target.value)}>
          <option value="">All Doctors</option>
          <option>Dr. Shekar Nayak</option>
          <option>Dr. John Doe</option>
          <option>Dr. Jane Smith</option>
        </select>
        <select className="border border-gray-300 rounded-md p-2 bg-white text-gray-700" onChange={(e) => onFilterChange('status', e.target.value)}>
          <option value="">All Statuses</option>
          <option value="Finished">Finished</option>
          <option value="Doing Treatment">Doing Treatment</option>
          <option value="Registered">Registered</option>
        </select>
      </div>
    </div>
  </div>
);

// Patient form modal component
const AddPatientModal = ({ onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [patientData, setPatientData] = useState({
    name: '', phone: '', email: '', gender: '', address: '', problem: '', habits: {}
  });

  const handleNext = () => setStep(2);
  const handlePrev = () => setStep(1);
  const handleChange = (e) => setPatientData({ ...patientData, [e.target.name]: e.target.value });
  const handleCheckboxChange = (e) => {
    setPatientData({ ...patientData, habits: { ...patientData.habits, [e.target.name]: e.target.checked } });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end">
      <div className="bg-white h-full p-8 rounded-l-md w-96">
        {step === 1 ? (
          <>
            <h2 className="text-lg font-bold mb-4">Patient Details</h2>
            <input name="name" placeholder="Name" className="mb-2 w-full p-2 border rounded" onChange={handleChange} />
            <input name="phone" placeholder="Phone" className="mb-2 w-full p-2 border rounded" onChange={handleChange} />
            <input name="email" placeholder="Email" className="mb-2 w-full p-2 border rounded" onChange={handleChange} />
            <select name="gender" className="mb-2 w-full p-2 border rounded" onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input name="address" placeholder="Address" className="mb-4 w-full p-2 border rounded" onChange={handleChange} />
            <textarea name="problem" placeholder="Problem" className="mb-4 w-full p-2 border rounded" onChange={handleChange} />
            <button className="w-full bg-blue-600 text-white py-2 rounded" onClick={handleNext}>Next</button>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold mb-4">Healthy Habits</h2>
            <label> <input type="checkbox" name="smokes" onChange={handleCheckboxChange} /> <span className="ml-2">Does the patient smoke?</span> </label>
            <label className="mt-2 block"> <input type="checkbox" name="exercises" onChange={handleCheckboxChange} /> <span className="ml-2">Does the patient exercise regularly?</span> </label>
            <label className="mt-2 block"> <input type="checkbox" name="washesHands" onChange={handleCheckboxChange} /> <span className="ml-2">Does the patient wash hands regularly?</span> </label>
            <label className="mt-2 block"> <input type="checkbox" name="healthyDiet" onChange={handleCheckboxChange} /> <span className="ml-2">Does the patient have a balanced diet?</span> </label>
            <label className="mt-2 block"> <input type="checkbox" name="sanitizes" onChange={handleCheckboxChange} /> <span className="ml-2">Does the patient use hand sanitizer?</span> </label>
            <div className="flex justify-between mt-4">
              <button className="bg-gray-300 text-black py-2 px-4 rounded" onClick={handlePrev}>Back</button>
              <button className="bg-blue-600 text-white py-2 px-4 rounded" onClick={() => onSubmit(patientData)}>Submit</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Main Reservation component with filtering capability
const Reservation = () => {
  const [date, setDate] = useState(new Date('2024-11-10'));
  const [appointments, setAppointments] = useState(initialAppointments);
  const [filters, setFilters] = useState({ doctor: '', status: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const filteredAppointments = appointments.filter(appt => {
    return appt.date === date.toISOString().split('T')[0] && (!filters.doctor || appt.doctor === filters.doctor) && (!filters.status || appt.status === filters.status);
  });

  const totalReservations = filteredAppointments.length;

  const handlePreviousDate = () => setDate(new Date(date.setDate(date.getDate() - 1)));
  const handleNextDate = () => setDate(new Date(date.setDate(date.getDate() + 1)));
  const handleAddPatient = (doctor, time) => { setSelectedSlot({ doctor, time }); setShowAddModal(true); };
  const handleAddPatientSubmit = (data) => {
    const newAppointment = { ...data, time: selectedSlot.time, doctor: selectedSlot.doctor, type: 'General Checkup', status: 'Registered', date: date.toISOString().split('T')[0] };
    setAppointments([...appointments, newAppointment]);
    setShowAddModal(false);
  };
  const handleFilterChange = (key, value) => setFilters({ ...filters, [key]: value });

  return (
    <div className="min-h-screen bg-gray-50 text-black p-4">
      <Header date={date} onPreviousDate={handlePreviousDate} onNextDate={handleNextDate} totalReservations={totalReservations} onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-2">
          <h3 className="text-lg font-semibold mb-4">Time</h3>
          {timeslots.map((time, index) => (
            <div key={index} className="py-6 text-gray-600 text-lg text-center">{time}</div>
          ))}
        </div>
        {['Dr. Shekar Nayak', 'Dr. John Doe', 'Dr. Jane Smith'].map((doctor, colIdx) => (
          <div key={colIdx} className="col-span-3 bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">{doctor}</h3>
            {timeslots.map((time, idx) => {
              const appointment = filteredAppointments.find(appt => appt.time === time && appt.doctor === doctor);
              return appointment ? (
                <div key={idx} className="relative bg-gray-100 p-4 mb-2 rounded-md">
                  {/* Status badge positioned in the top-right corner */}
                  <span className="absolute top-1 right-2 text-xs text-white bg-blue-500 px-2 py-1 rounded-full">
                    {appointment.status}
                  </span>

                  {/* Display patient name, problem, and appointment time */}
                  <span className="block text-sm font-bold">{appointment.patient}</span>
                  <span className="block text-xs text-gray-600 mt-1">{appointment.problem}</span>
                  <span className="text-xs text-gray-500 mt-1">{appointment.time}</span>
                </div>
              ) : (
                <div key={idx} className="p-6 rounded-md text-center cursor-pointer group relative" onClick={() => handleAddPatient(doctor, time)}>
                  <span className="text-2xl text-blue-600 hidden group-hover:block absolute inset-0 m-auto">+</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {showAddModal && <AddPatientModal onClose={() => setShowAddModal(false)} onSubmit={handleAddPatientSubmit} />}
    </div>
  );
};

export default Reservation;
