import React, { useState, useEffect, useMemo } from 'react';
import { FaUserMd, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BACKEND_URL = "http://localhost:5000"

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
const interval = 30;

const timeslots = generateTimeSlots(startTime, endTime, interval);

const Header = ({ date, onPreviousDate, onNextDate, totalReservations, onFilterChange, doctorsList }) => (
  <div className="bg-gray-100 p-4 flex flex-col space-y-2">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-blue-800">Calendar</h2>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src="/icons/reservation.svg" alt="Reservations" />
        <span className="text-lg font-bold text-gray-700"> {totalReservations()} </span>
        <p className="text-lg font-medium text-gray-400">total appointments</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-lg font-semibold text-gray-400 gap-2 flex">
          <button onClick={onPreviousDate}>&lt;</button>
          <span className="text-gray-600">{date.toDateString()}</span>
          {console.log("Date in reservation header: ", date.toDateString())}
          <button onClick={onNextDate}>&gt;</button>
        </div>

        <div className="relative inline-flex items-center">
          <FaUserMd className="absolute left-3 text-blue-700" />
          <select
            className="border border-gray-300 rounded-md p-2 pl-10 bg-white text-gray-700"
            onChange={(e) => onFilterChange('doctor', e.target.value)}
          >
            <option value="">All Doctors</option>
            {
              doctorsList.map((doctor, index) => (
                <option key={index} value={doctor}>
                  {doctor}
                </option>
              ))
            }
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
    name: '', phone: '', email: '', password: 'asd@1234', gender: '', address: '', problem: '', habits: {}
  });

  const [fetchedPatientsData, setfetchedPatientsData] = useState([]);
  
  const handleNext = () => setStep(2);
  const handlePrev = () => setStep(1);
  const handleChange = (e) => setPatientData({ ...patientData, [e.target.name]: e.target.value });
  const handleCheckboxChange = (e) => {
    setPatientData({ ...patientData, habits: { ...patientData.habits, [e.target.name]: e.target.checked } });
  };

    useEffect(() => {
      const fetchPatientInfo = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/patients`);  
          console.log("fetchedPatientsData: ", response.data)
          setfetchedPatientsData(response.data);
        } catch (error) {
          console.error("Error fetching patient profile:", error.message);
        } 
      };
  
      fetchPatientInfo();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      console.log('Patient data before submitting:', patientData);
  
  
      try {
        const existingPatient = fetchedPatientsData.find((p) => p.email === patientData.email);
  
        if (existingPatient) {
          console.log('Existing patient found:', existingPatient);
          onSubmit(existingPatient._id, patientData.problem);
        } else {
          console.log('Existing patient was not found');

          const patientResponse = await axios.post(
            `${BACKEND_URL}/api/patients`,
            patientData, 
            { headers: { 'Content-Type': 'application/json' } }
          );
  
          console.log('Patient added successfully:', patientResponse.data);
          onSubmit(patientResponse.data._id, patientData.problem);
        }
      } catch (error) {
        console.error('Error adding patient:', error);
      }
      onClose();
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
              <button className="bg-blue-600 text-white py-2 px-4 rounded" onClick={handleSubmit}>Submit</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Reservation component
const Reservation = () => {
  const { userId } = useParams();

  const [date, setDate] = useState(new Date());

  useEffect(() => {
      setDate(new Date()); 
  }, []);
  
  const [appointments, setAppointments] = useState([]);
  
  const [doctors, setdoctors] = useState(null);
  const [filters, setFilters] = useState({ doctor: '', status: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({ doctor: '', time: '' });
  
  const [admin, setAdmin] = useState([]);
  
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        console.log("userId: ", userId);
        const response = await axios.get(`${BACKEND_URL}/api/admins/${userId}`);
        setAdmin(response.data);
        console.log('Admin details fetched successfully:', response.data);
      } catch (error) {
        console.error(`Failed to fetch admin details for userId ${userId}:`, error);
      }
    };
    fetchAdmin();
  }, [userId]);

  
  useEffect(() => {
    if (admin && admin.hospital) {
      const AdminHospitalId = admin.hospital._id;
      console.log("AdminHospitalId: ", AdminHospitalId);
  
      const fetchAppointments = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/appointments`);
          const sortAppointments = response.data.filter(appointment => appointment.hospital._id === AdminHospitalId);

          setAppointments(sortAppointments);
          console.log('Appointments details fetched successfully:', sortAppointments);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      };
  
      const fetchDoctors = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/doctors`);
          const sortDoctors = response.data.filter(doctor => doctor.hospital._id === AdminHospitalId);

          setdoctors(sortDoctors);
          console.log('Doctor details fetched successfully:', sortDoctors);
        } catch (error) {
          console.error('Error fetching doctors:', error);
        }
      };
  
      fetchAppointments();
      fetchDoctors();
    }
  }, [admin]);  
  
  



  const filteredAppointments = Array.isArray(appointments)
  ? appointments.filter((appt) => {
      console.log(appt?.doctor?.name, appt.status);

      return (
        appt.date === date.toLocaleDateString('en-CA') &&
        appt.doctor &&
        (!filters.doctor || appt.doctor.name === filters.doctor) &&
        (!filters.status || appt.status === filters.status)
      );
    })
  : [];

  

  const totalReservations = () => filteredAppointments?.length || 0;

  
  const handlePreviousDate = () => setDate(new Date(date.setDate(date.getDate() - 1)));
  const handleNextDate = () => setDate(new Date(date.setDate(date.getDate() + 1)));

  const uniqueDoctors = useMemo(() => {
    return doctors ? [...new Set(doctors.map((doc) => doc.name))] : [];
  }, [doctors]);
  
  const handleAddPatient = (doctor, time) => {
    { console.log("handleAddPatient: ", doctor) }
    setSelectedSlot({ doctor, time });
    setShowAddModal(true);
  };


  const handleAddPatientSubmit = async (patientId, problem) => {
    const doctorData = doctors.find(doc => doc.name === selectedSlot.doctor);

    const newAppointment = {
      doctor: doctorData._id,
      patient: patientId,
      time: selectedSlot.time,
      date: date.toISOString().split('T')[0],
      type: doctorData.specialization,
      problem: problem,
      status: 'Registered'
    };

    setShowAddModal(false);

    console.log('Appointment data before submitting:', newAppointment);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/appointments`,
        JSON.stringify(newAppointment),
        { headers: { 'Content-Type': 'application/json' } }
      );
      setAppointments(prevAppointments => [...prevAppointments, response.data]);

      const appointmentsResponse = await axios.get(`${BACKEND_URL}/api/appointments`);
      setAppointments(appointmentsResponse.data);
      console.log('Appointment added successfully:', response.data);
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  const handleFilterChange = (key, value) => setFilters({ ...filters, [key]: value });

  const toggleStatus = async (appointmentId, currentStatus) => {
    if (currentStatus != "finished") {
      const statusOrder = ['registered', 'doing treatment', 'finished'];
      const currentIndex = statusOrder.indexOf(currentStatus);
      const nextIndex = (currentIndex + 1) % statusOrder.length;
      const nextStatus = statusOrder[nextIndex];

      console.log(`Updating Appointment ID: ${appointmentId} to Status: ${nextStatus}`);

      try {
        await axios.patch(`${BACKEND_URL}/api/appointments/${appointmentId}`, { status: nextStatus });

        setAppointments(prevAppointments =>
          prevAppointments.map((appt) =>
            appt._id === appointmentId ? { ...appt, status: nextStatus } : appt
          )
        );

        console.log(`Appointment ID: ${appointmentId} updated to status: ${nextStatus}`);
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 text-black p-4 ">
      <Header
        date={date}
        onPreviousDate={handlePreviousDate}
        onNextDate={handleNextDate}
        totalReservations={totalReservations}
        onFilterChange={handleFilterChange}
        doctorsList={uniqueDoctors}
      />

      <div className="flex  space-x-4 mt-4">
        <div className="w-max">
          <h3 className="text-lg font-semibold my-4 text-center">Time</h3>
          {timeslots.map((time, index) => (
            <div key={index} className="py-[36px] border-y text-gray-600 text-lg text-center">
              {time}
            </div>
          ))}
        </div>

        <div className="flex !overflow-x-scroll space-x-4 mt-4">

          {/* Display doctors horizontally with scrolling */}
          <div className="flex space-x-4">
            {uniqueDoctors.map((doctor, colIdx) => (
              <div key={colIdx} className="w-[300px] bg-white p-4 rounded-md shadow-md">
                <h3 className="text-lg font-semibold mb-4">{doctor}</h3>

                {timeslots.map((time, idx) => {
                  const appointment = filteredAppointments.find(
                    (appt) => appt.time === time && appt.doctor?.name === doctor
                  );

                  
                  
                  return appointment ? (
                    <div key={idx} className="relative bg-gray-100 p-4 mb-2 rounded-md">
                      {console.log("appointment date: ", appointment.date)}
                      <div
                        className={`absolute top-4 right-2 text-xs text-white px-2 py-1 rounded-full cursor-pointer 
                        ${appointment.status.toLowerCase() === 'finished' ? 'bg-green-500' :
                            appointment.status.toLowerCase() === 'doing treatment' ? 'bg-yellow-500' :
                              appointment.status.toLowerCase() === 'registered' ? 'bg-blue-500' :
                                ''
                          }`}
                        onClick={() => toggleStatus(appointment._id, appointment.status.toLowerCase())}
                      >
                        {appointment.status}
                      </div>

                      <span className="block text-sm font-bold">{appointment.patient?.name}</span>
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
        </div>
      </div>

      {showAddModal && (
        <AddPatientModal
          onClose={() => setShowAddModal(false)}
          onSubmit={(patientId, problem) => {
            handleAddPatientSubmit(patientId, problem);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );

};

export default Reservation;
