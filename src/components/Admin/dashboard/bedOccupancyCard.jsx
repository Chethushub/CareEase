import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { FaBed } from 'react-icons/fa';
import { motion } from "framer-motion";
import axios from 'axios';

const BACKEND_URL = "http://localhost:5000";

const BedOccupancyCard = ({ adminId }) => {
  const [bedData, setBedData] = useState([]);

  useEffect(() => {
    const fetchBedData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/beds`);
        console.log("DB beds data:", response.data);
        setBedData(response.data);
      } catch (err) {
        console.error("Error fetching bed data:", err);
      }
    };

    fetchBedData();
  }, []);

  // Calculate the number of beds in each status
  const occupiedBeds = bedData.filter(item => item.status.toLowerCase() === 'occupied').length;
  const availableBeds = bedData.filter(item => item.status.toLowerCase() === 'available').length;
  const outOfServiceBeds = bedData.filter(item => item.status.toLowerCase() === 'out of service').length;
  const quarantinedBeds = bedData.filter(item => item.status.toLowerCase() === 'quarantined').length;
  const reservedBeds = bedData.filter(item => item.status.toLowerCase() === 'reserved').length;
  const underObservationBeds = bedData.filter(item => item.status.toLowerCase() === 'under observation').length;
  const cleaningBeds = bedData.filter(item => item.status.toLowerCase() === 'cleaning').length;

  const bedOccupancyData = {
    labels: ['Occupied', 'Available', 'Out of Service', 'Quarantined', 'Reserved', 'Under Observation', 'Cleaning'],
    datasets: [{
      data: [occupiedBeds, availableBeds, outOfServiceBeds, quarantinedBeds, reservedBeds, underObservationBeds, cleaningBeds],
      backgroundColor: ['#F44336', '#4CAF50', '#9E9E9E', '#FFEB3B', '#FFC107', '#3F51B5', '#00BCD4'],
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
