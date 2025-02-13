import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { FaBed } from 'react-icons/fa';
import { motion } from "framer-motion";
import axios from 'axios';

const BACKEND_URL = "http://localhost:5000";

const BedOccupancyCard = ({ adminId }) => {
  const [bedData, setBedData] = useState([]);

  
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
        
            const fetchBedData = async () => {
              try {
                const response = await axios.get(`${BACKEND_URL}/api/beds`);
                const sortBeds = response.data.filter(bed => bed.hospital._id === AdminHospitalId);
    
                setBedData(sortBeds);
                console.log('Beds details fetched successfully:', sortBeds);
              } catch (err) {
                console.error("Error fetching bed data:", err);
              }
            };
        
            fetchBedData();
          }
        }, [admin]);  
        
  


  // Calculate the number of beds in each status
  const occupiedBeds = bedData.filter(item => item.status.toLowerCase() === 'occupied').length;
  const availableBeds = bedData.filter(item => item.status.toLowerCase() === 'available').length;
  const reservedBeds = bedData.filter(item => item.status.toLowerCase() === 'reserved').length;
  const undermaintenance = bedData.filter(item => item.status.toLowerCase() === 'under observation').length;

  const bedOccupancyData = {
    labels: ['Occupied', 'Available', 'Reserved', 'Under Maintenance'],
    datasets: [{
      data: [occupiedBeds, availableBeds, reservedBeds, undermaintenance],
      backgroundColor: ['#F44336', '#4CAF50', '#9E9E9E', '#FFEB3B'],
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
