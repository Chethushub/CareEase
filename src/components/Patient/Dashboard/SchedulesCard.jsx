import React, { useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';  

const BACKEND_URL = "http://localhost:5000";

const SchedulesCard = ({ patientId }) => {
  const [PatientAppointmentData, setPatientAppointmentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/appointments/`);
        const patientAppointments = response.data.filter(appointment => appointment.patient._id === patientId);
        console.log("Patient AppointmentData", patientAppointments);

        setPatientAppointmentData(patientAppointments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointment data:", error);
        setLoading(false);
      }
    };

    fetchAppointmentData();
  }, [patientId]);  

  return (
    <motion.div className="p-6 bg-white rounded-lg shadow-lg max-h-[250px] overflow-y-auto" whileHover={{ scale: 1.02 }}>
      <h2 className="flex items-center gap-2 text-blue-800 text-xl font-semibold">
        <FaCalendarAlt size={24} /> My Schedules
      </h2>

      {loading ? (
        <p>Loading appointments...</p>
      ) : (
        <ul className="my-4 max-h-[400px] overflow-y-auto">
          {console.log("Patient AppointmentData in ul", PatientAppointmentData)}

          {PatientAppointmentData && PatientAppointmentData.length > 0 ? (
            PatientAppointmentData.map((schedule, index) => (
              <li key={`${schedule._id}-${index}`} className="bg-white p-4 my-2 rounded-lg shadow-md border border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-black-800">{schedule.doctor ? schedule.doctor.name : "No Doctor Info"}</h3>
                  <p className="text-sm text-gray-500">
                    {schedule.doctor ? schedule.doctor.specialization : "No Specialization Info"}
                  </p>
                </div>
                <div className="mt-2">
                  <p><strong>Date & Time:</strong> <span >{schedule.date} at {schedule.time}</span></p>
                  <p><strong>Problem:</strong> <span>{schedule.problem}</span></p>
                  <p><strong>Status:</strong> <span>{schedule.status}</span></p>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">No appointments found.</p>
          )}
        </ul>
      )}
    </motion.div>

  );
};

export default SchedulesCard;
