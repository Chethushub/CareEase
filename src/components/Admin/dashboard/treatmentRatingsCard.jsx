import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const BASE_URL = 'http://localhost:5000/api/treatments';

const TreatmentRatingsCard = ({ adminId }) => {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTreatments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(BASE_URL);
        setTreatments(response.data || []);
        setError(null);
        console.log('All Treatment data: ', response.data);
      } catch (err) {
        setError('Failed to load treatments. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTreatments();
  }, []);

  return (
    <motion.div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200" whileHover={{ scale: 1.01 }}>
      <h4 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
        <FaStar /> Top Treatment Ratings
      </h4>

      {loading ? (
        <p>Loading treatments...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="space-y-2 mt-2">
          {treatments
            .sort((a, b) => b.rating - a.rating) 
            .slice(0, 3) 
            .map((treatment) => (
              <li key={treatment._id} className="flex items-center justify-between">
                <span>{treatment.name}</span>
                <span className="flex items-center gap-1">
                <FaStar className="text-yellow-500" /> 
                  {parseFloat(treatment.rating).toFixed(1)} ({treatment.reviews})
                </span>
              </li>
            ))}
        </ul>
      )}
    </motion.div>
  );
};

export default TreatmentRatingsCard;
