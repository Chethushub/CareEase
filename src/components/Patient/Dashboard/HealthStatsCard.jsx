import React, { useMemo } from 'react';
import { FaHeartbeat } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';

const HealthStatsCard = () => {
  const healthStatsData = useMemo(() => ({
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Heart Rate',
        data: [72, 75, 78, 80, 76],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
      },
    ],
  }), []);

  return (
    <motion.div className="p-6 bg-white rounded-lg shadow-lg" whileHover={{ scale: 1.02 }}>
      <h2 className="flex items-center gap-2 text-blue-800 text-xl font-semibold">
        <FaHeartbeat size={24} /> Health Stats
      </h2>
      <div className="mt-4">
        <Line data={healthStatsData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>
    </motion.div>
  );
};

export default HealthStatsCard;
