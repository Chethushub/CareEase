import React, { useState, useEffect } from 'react';
import { FaHeart, FaCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HealthTipsCard = () => {
  const healthTipsList = [
    'Drink plenty of water to stay hydrated.',
    'Aim for 7-9 hours of sleep each night for optimal health.',
    'Exercise regularly to maintain your physical and mental well-being.',
    'Eat a balanced diet with a focus on fresh vegetables and fruits.',
    'Take short breaks when working to reduce eye strain and fatigue.',
    'Practice deep breathing to reduce stress and improve focus.',
    'Limit processed foods and eat whole, nutrient-rich meals.',
    'Stretch daily to maintain flexibility and prevent injuries.',
    'Spend time outdoors to get fresh air and natural sunlight.',
    'Stay socially connected for better mental health and well-being.',
    'Wash your hands frequently to prevent infections.',
    'Avoid excessive sugar intake to maintain stable energy levels.',
    'Stand up and move around every hour if you sit for long periods.',
    'Reduce screen time before bed to improve sleep quality.',
    'Maintain a positive mindset to improve overall health.',
  ];

  const [dailyTips, setDailyTips] = useState([]);

  useEffect(() => {
    const lastUpdated = localStorage.getItem('lastUpdated');
    const storedTips = JSON.parse(localStorage.getItem('dailyTips'));

    const today = new Date().toDateString();

    if (lastUpdated === today && storedTips) {
      setDailyTips(storedTips);
      return;
    }

    const getRandomTips = (numTips) => {
      const shuffled = [...healthTipsList].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, numTips);
    };

    const newTips = getRandomTips(Math.floor(Math.random() * 2) + 3); 

    localStorage.setItem('lastUpdated', today);
    localStorage.setItem('dailyTips', JSON.stringify(newTips));
    setDailyTips(newTips);
  }, []);

  return (
    <motion.div className="p-6 bg-white rounded-lg shadow-lg" whileHover={{ scale: 1.02 }}>
      <h2 className="flex items-center gap-2 text-blue-800 text-xl font-semibold">
        <FaHeart size={24} /> Daily Health Tips
      </h2>
      <ul className="mt-4 space-y-3">
        {dailyTips.map((tip, index) => (
          <li key={index} className="text-gray-700 flex items-center">
            <FaCircle size={8} className="mr-2 text-blue-400" /> {tip}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default HealthTipsCard;
