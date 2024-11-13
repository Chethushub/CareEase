import React, { useState } from 'react';
import { FaUserMd, FaCheckCircle } from 'react-icons/fa';

const initialAppointments = [
  { doctor: 'Dr. Jane Smith', patientName: 'Aarav Kumar', time: '9:30 AM', date: '2024-11-10', type: 'Dental Checkup', problem: 'Toothache', status: 'Finished' },
  { doctor: 'Dr. Jane Smith', patientName: 'Priya Patel', time: '10:30 AM', date: '2024-11-10', type: 'Dental Checkup', problem: 'Gum Inflammation', status: 'Doing Treatment' },
  { doctor: 'Dr. Jane Smith', patientName: 'Ravi Verma', time: '11:30 AM', date: '2024-11-10', type: 'General Checkup', problem: 'Back Pain', status: 'Registered' },
  { doctor: 'Dr. Shekar Nayak', patientName: 'Ananya Reddy', time: '12:00 PM', date: '2024-11-10', type: 'Eye Checkup', problem: 'Blurred Vision', status: 'Registered' },
  { doctor: 'Dr. Shekar Nayak', patientName: 'Ishaan Sharma', time: '1:00 PM', date: '2024-11-10', type: 'Eye Checkup', problem: 'Dry Eyes', status: 'Registered' },
  { doctor: 'Dr. John Doe', patientName: 'Neha Gupta', time: '2:00 PM', date: '2024-11-10', type: 'Orthopedic Checkup', problem: 'Knee Pain', status: 'Registered' },
  { doctor: 'Dr. John Doe', patientName: 'Arjun Singh', time: '3:00 PM', date: '2024-11-10', type: 'Orthopedic Checkup', problem: 'Sprained Ankle', status: 'Registered' },
  { doctor: 'Dr. Shekar Nayak', patientName: 'Saanvi Rao', time: '9:00 AM', date: '2024-11-10', type: 'General Checkup', problem: 'Headache', status: 'Finished' },
  { doctor: 'Dr. Shekar Nayak', patientName: 'Vikram Desai', time: '10:00 AM', date: '2024-11-10', type: 'General Checkup', problem: 'Fever', status: 'Doing Treatment' },
  { doctor: 'Dr. John Doe', patientName: 'Tanya Mehta', time: '11:00 AM', date: '2024-11-10', type: 'General Checkup', problem: 'Cold', status: 'Registered' }
];

const generateTimeSlots = (start, end, interval) => {
  const timeslots = [];
  let current = new Date(start);

  while (current <= end) {
    const hours = current.getHours();
    const minutes = current.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes === 0 ? '00' : minutes;
    timeslots.push(`${formattedHours}:${formattedMinutes} ${ampm}`);
    current = new Date(current.getTime() + interval * 60000);
  }
  return timeslots;
};

const startTime = new Date('1970-01-01T09:00:00');
const endTime = new Date('1970-01-01T16:00:00');
const interval = 30; // 30 minutes

const timeslots = generateTimeSlots(startTime, endTime, interval);


const Header = ({ date, onPreviousDate, onNextDate, totalReservations, onFilterChange }) => (
  <div className="bg-gray-100 p-4 flex flex-col space-y-2">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-blue-800">Calendar</h2>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src="./icons/reservation.svg" alt="Reservations" />
        <span className="text-lg font-bold text-gray-700"> {totalReservations} </span>
        <p className="text-lg font-medium text-gray-400">total appointments</p>
      </div>

      <div className="flex items-center space-x-4">
        {/* Date Navigation */}
        <div className="text-lg font-semibold text-gray-400 gap-2 flex">
          <button onClick={onPreviousDate}>&lt;</button>
          <span className="text-gray-600">{date.toDateString()}</span>
          <button onClick={onNextDate}>&gt;</button>
        </div>

        <div className="relative inline-flex items-center">
          <FaUserMd className="absolute left-3 text-blue-700" />
          <select
            className="border border-gray-300 rounded-md p-2 pl-10 bg-white text-gray-700"
            onChange={(e) => onFilterChange('doctor', e.target.value)}
          >
            <option value="">All Doctors</option>
            <option>Dr. Shekar Nayak</option>
            <option>Dr. John Doe</option>
            <option>Dr. Jane Smith</option>
          </select>
        </div>

        <div className="relative inline-flex items-center">
          <FaCheckCircle className="absolute left-3 text-blue-700" />
          <select
            className="border border-gray-300 rounded-md p-2 pl-10 bg-white text-gray-700"
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Finished">Finished</option>
            <option value="Doing Treatment">Doing Treatment</option>
            <option value="Registered">Registered</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);


// Patient form modal component
const AddPatientModal = ({ onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [patientData, setPatientData] = useState({
    patientName: '', phone: '', email: '', gender: '', address: '', problem: '', habits: {}
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
            <input name="patientName" placeholder="Name" className="mb-2 w-full p-2 border rounded" onChange={handleChange} />
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

// Updated Reservation component with 15-minute intervals
const Reservation = () => {
  const [date, setDate] = useState(new Date('2024-11-10'));
  const [appointments, setAppointments] = useState(initialAppointments);
  const [filters, setFilters] = useState({ doctor: '', status: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const filteredAppointments = appointments.filter(appt => {
    return (
      appt.date === date.toISOString().split('T')[0] &&
      (!filters.doctor || appt.doctor === filters.doctor) &&
      (!filters.status || appt.status === filters.status)
    );
  });

  const totalReservations = filteredAppointments.length;

  const handlePreviousDate = () => setDate(new Date(date.setDate(date.getDate() - 1)));
  const handleNextDate = () => setDate(new Date(date.setDate(date.getDate() + 1)));
  const handleAddPatient = (doctor, time) => {
    setSelectedSlot({ doctor, time });
    setShowAddModal(true);
  };

  const handleAddPatientSubmit = (data) => {
    const newAppointment = {
      ...data,
      time: selectedSlot.time,
      doctor: selectedSlot.doctor,
      type: 'General Checkup',
      status: 'Registered',
      date: date.toISOString().split('T')[0]
    };
    setAppointments([...appointments, newAppointment]);
    setShowAddModal(false);
  };
  const handleFilterChange = (key, value) => setFilters({ ...filters, [key]: value });

  return (
    <div className="min-h-screen bg-gray-50 text-black p-4">
      <Header
        date={date}
        onPreviousDate={handlePreviousDate}
        onNextDate={handleNextDate}
        totalReservations={totalReservations}
        onFilterChange={handleFilterChange}
      />
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-1">
          <h3 className="text-lg font-semibold my-4 text-center">Time</h3>
          {timeslots.map((time, index) => (
            <div key={index} className="py-[36px] border-y text-gray-600 text-lg text-center">
              {time}
            </div>
          ))}
        </div>

        {['Dr. Shekar Nayak', 'Dr. John Doe', 'Dr. Jane Smith'].map((doctor, colIdx) => (
          <div key={colIdx} className="col-span-3 bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-4">{doctor}</h3>
            {timeslots.map((time, idx) => {
              const appointment = filteredAppointments.find(
                (appt) => appt.time === time && appt.doctor === doctor
              );

              return appointment ? (
                <div key={idx} className="relative bg-gray-100 p-4 mb-2 rounded-md">
                  <div
                    className={`absolute top-4 right-2 text-xs text-white px-2 py-1 rounded-full 
                      ${appointment.status === 'Finished' ? 'bg-green-500' :
                        appointment.status === 'Doing Treatment' ? 'bg-yellow-500' :
                          appointment.status === 'Registered' ? 'bg-blue-500' :
                            ''
                      }`}
                  >
                    {appointment.status}
                  </div>

                  <span className="block text-sm font-bold">{appointment.patientName}</span>
                  <span className="block text-xs text-gray-600 mt-1">{appointment.problem}</span>
                  <span className="text-xs text-gray-500 mt-1">{appointment.time}</span>
                </div>
              ) : (
                <div
                  key={idx}
                  className="py-[50px] rounded-md  text-center cursor-pointer group relative"
                  onClick={() => handleAddPatient(doctor, time)}
                >
                  <span className="text-2xl  text-blue-600 hidden group-hover:block  absolute inset-0 m-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    +
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {showAddModal && (
        <AddPatientModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddPatientSubmit}
        />
      )}
    </div>
  );
};

export default Reservation;
