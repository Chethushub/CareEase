import React from 'react';
import { FaHeart, FaCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { healthTips } from './data';

const HealthTipsCard = () => (
  <motion.div className="p-6 bg-white rounded-lg shadow-lg" whileHover={{ scale: 1.02 }}>
    <h2 className="flex items-center gap-2 text-blue-800 text-xl font-semibold">
      <FaHeart size={24} /> Health Tips
    </h2>
    <ul className="mt-4 space-y-3">
      {healthTips.map((tip, index) => (
        <li key={index} className="text-gray-700 flex items-center">
          <FaCircle size={8} className="mr-2 text-blue-200" /> {tip}
        </li>
      ))}
    </ul>
  </motion.div>
);

export default HealthTipsCard;
