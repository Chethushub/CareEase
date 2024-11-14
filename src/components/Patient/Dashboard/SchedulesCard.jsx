import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { schedules } from './data';

const SchedulesCard = () => (
  <motion.div className="p-6 bg-white rounded-lg shadow-lg" whileHover={{ scale: 1.02 }}>
    <h2 className="flex items-center gap-2 text-blue-800 text-xl font-semibold">
      <FaCalendarAlt size={24} /> My Schedules
    </h2>
    <ul className="mt-4">
      {schedules.map(schedule => (
        <li key={schedule.id} className="mb-4 border-b pb-2">
          <p><strong>Doctor:</strong> {schedule.doctor}</p>
          <p><strong>Time:</strong> {schedule.time}</p>
          <p><strong>Location:</strong> {schedule.location}</p>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default SchedulesCard;
