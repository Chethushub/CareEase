import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { FaCalendarAlt } from 'react-icons/fa';
import initialData from './data';

const AppointmentsCard = ({ timeframe, onTimeframeChange }) => {
  const appointmentData = useMemo(() => ({
    labels: timeframe.appointment === 'weeks' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: timeframe.appointment === 'weeks' ? 'Weekly Appointments' : 'Monthly Appointments',
      data: initialData.appointments[timeframe.appointment],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  }), [timeframe.appointment]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
          <FaCalendarAlt /> Appointments
        </h4>
        <div className="flex space-x-2">
          <button onClick={() => onTimeframeChange('appointment', 'weeks')} className={`px-2 py-1 rounded ${timeframe.appointment === 'weeks' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>Weeks</button>
          <button onClick={() => onTimeframeChange('appointment', 'months')} className={`px-2 py-1 rounded ${timeframe.appointment === 'months' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>Months</button>
        </div>
      </div>
      <Line data={appointmentData} options={{ scales: { x: { title: { display: true, text: 'Timeframe' } }, y: { title: { display: true, text: 'Appointments' } } } }} />    </div>
  );
};

export default AppointmentsCard;
