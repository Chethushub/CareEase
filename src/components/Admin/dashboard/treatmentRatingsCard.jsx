import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const BASE_URL = '${BACKEND_URL}/api/treatments';


const TreatmentRatingsCard = ({ adminId }) => {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [admin, setAdmin] = useState([]);
  
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        console.log("userId: ", adminId);
        const response = await axios.get(`${BACKEND_URL}/api/admins/${adminId}`);
        setAdmin(response.data);
        console.log('Admin details fetched successfully:', response.data);
      } catch (error) {
        console.error(`Failed to fetch admin details for userId ${adminId}:`, error);
      }
    };
    fetchAdmin();
  }, [adminId]);

    useEffect(() => {
      if (admin && admin.hospital) {
        const AdminHospitalId = admin.hospital._id;
        console.log("AdminHospitalId: ", AdminHospitalId);
    
        const fetchTreatments = async () => {
          try {
            const response = await axios.get(`${BACKEND_URL}/api/treatments`);
        
            const sortTreatments = response.data.filter(
              treatment => treatment.hospital && treatment.hospital._id === AdminHospitalId
            );
        
            setTreatments(sortTreatments);
            console.log('Treatments details fetched successfully:', sortTreatments);
          } catch (error) {
            console.error(error);
          }
        };
        
        fetchTreatments();
      }
    }, [admin]);  


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
