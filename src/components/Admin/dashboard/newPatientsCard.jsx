import React, { useEffect, useState, useMemo } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import axios from 'axios';
import { motion } from "framer-motion";

const NewPatientsCard = ({ timeframe, onTimeframeChange, adminId }) => {

  const [appointments, setAppointments] = useState([]);
  
  const currentDate = new Date();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/appointments");  
        const patientAppointments = response.data;
        console.log("patientAppointments data: ", patientAppointments); 
        setAppointments(patientAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const filterAppointmentsByTimeframe = (appointments, timeframe) => {
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      const timeDifference = currentDate - appointmentDate; 

      if (timeframe === 'weeks') {
        const oneWeekInMs = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds
        return timeDifference <= oneWeekInMs; 
      }

      if (timeframe === 'months') {
        const oneMonthInMs = 30 * 24 * 60 * 60 * 1000; // 1 month in milliseconds
        return timeDifference <= oneMonthInMs; 
      }

      return false;
    });
  };

  const patientFrequency = useMemo(() => {
    const filteredAppointments = filterAppointmentsByTimeframe(appointments, timeframe.newPatients);

    const patientAppointmentsMap = {};

    filteredAppointments.forEach(appointment => {
      const patientId = appointment.patient._id;
      if (!patientAppointmentsMap[patientId]) {
        patientAppointmentsMap[patientId] = 0;
      }
      patientAppointmentsMap[patientId]++;
    });

    const newPatientCount = Object.values(patientAppointmentsMap).filter(count => count === 1).length;
    const oldPatientCount = Object.values(patientAppointmentsMap).filter(count => count > 1).length;

    return { newPatientCount, oldPatientCount };
  }, [appointments, timeframe]);

  return (
    <motion.div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200" whileHover={{ scale: 1.01 }}>
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
          <FaUserPlus /> Patients visit in last
        </h4>
        <div className="flex space-x-2">
          <button onClick={() => onTimeframeChange('newPatients', 'weeks')} className={`px-2 py-1 rounded ${timeframe.newPatients === 'weeks' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>Week</button>
          <button onClick={() => onTimeframeChange('newPatients', 'months')} className={`px-2 py-1 rounded ${timeframe.newPatients === 'months' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>Month</button>
        </div>
      </div>
      <div className="flex justify-around text-center">
        <div className='text-lg font-semibold text-blue-800 gap-2'>
          <p className="text-sm text-gray-500">New Patients</p>
          <p className="text-2xl font-semibold text-gray-800">{patientFrequency.newPatientCount}</p>
        </div>

        <div className='text-lg font-semibold text-blue-800 gap-2'>
          <p className="text-sm text-gray-500">Old Patients</p>
          <p className="text-2xl font-semibold text-gray-800">{patientFrequency.oldPatientCount}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default NewPatientsCard;
