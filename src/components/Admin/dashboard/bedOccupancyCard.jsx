import React from 'react';
import { Pie } from 'react-chartjs-2';
import { FaBed } from 'react-icons/fa';
import { motion } from "framer-motion"
import initialData from './data';

const BedOccupancyCard = ({adminId}) => {
  const bedOccupancyData = {
    labels: initialData.bedOccupancy.map(item => item.name),
    datasets: [{
      data: initialData.bedOccupancy.map(item => item.value),
      backgroundColor: ['#4CAF50', '#FF9800', '#F44336']
    }]
  };

  return (
    <motion.div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200" whileHover={{ scale: 1.01 }}>
      <h4 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
        <FaBed /> Bed Occupancy
      </h4>
      <Pie data={bedOccupancyData} />
    </motion.div>
  );
};

export default BedOccupancyCard;
