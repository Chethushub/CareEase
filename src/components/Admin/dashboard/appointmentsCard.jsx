import React, { useMemo, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';

const BACKEND_URL = "http://localhost:5000";

const AppointmentsCard = ({ timeframe, onTimeframeChange, adminId }) => {
  const [appointments, setAppointments] = useState([]);
  
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/appointments`);
        setAppointments(response.data);
        console.log('Appointments details fetched successfully in AppointmentsCard:', response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAppointments();
  }, []);

  const aggregateAppointments = (appointments, timeframe) => {
    const counts = timeframe === 'weeks' ? Array(7).fill(0) : Array(12).fill(0);
    
    appointments.forEach(appointment => {
      const date = new Date(appointment.date);
      const index = timeframe === 'weeks' 
        ? date.getDay() 
        : date.getMonth();
        
      counts[index]++;
    });
    
    return counts;
  };

  const appointmentData = useMemo(() => {
    const data = aggregateAppointments(appointments, timeframe.appointment);
    return {
      labels: timeframe.appointment === 'weeks' 
        ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: timeframe.appointment === 'weeks' ? 'Weekly Appointments' : 'Monthly Appointments',
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };
  }, [appointments, timeframe.appointment]);

  return (
    <div>
      <motion.div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200" whileHover={{ scale: 1.01 }}>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
            <FaCalendarAlt /> Appointments
          </h4>
          <div className="flex space-x-2">
            <button onClick={() => onTimeframeChange('appointment', 'weeks')} className={`px-2 py-1 rounded ${timeframe.appointment === 'weeks' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>Weeks</button>
            <button onClick={() => onTimeframeChange('appointment', 'months')} className={`px-2 py-1 rounded ${timeframe.appointment === 'months' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>Months</button>
          </div>
        </div>
        <Line data={appointmentData} options={{ scales: { x: { title: { display: true, text: 'Timeframe' } }, y: { title: { display: true, text: 'Appointments' } } } }} />
      </motion.div>
    </div>
  );
};

export default AppointmentsCard;
