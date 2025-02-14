import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { FaBed } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const BedOccupancyCard = ({ adminId }) => {
  const [bedData, setBedData] = useState([]);
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        console.log("adminId:", adminId);
        const response = await axios.get(`${BACKEND_URL}/api/admins/${adminId}`);
        setAdmin(response.data);
        console.log('Admin details fetched successfully:', response.data);
      } catch (error) {
        console.error(`Failed to fetch admin details for adminId ${adminId}:`, error);
      }
    };
    fetchAdmin();
  }, [adminId]);

  useEffect(() => {
    if (admin?.hospital && admin.hospital._id) {
      const AdminHospitalId = admin.hospital._id;
      console.log("AdminHospitalId:", AdminHospitalId);
      const fetchBedData = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/beds`);
          const sortedBeds = response.data.filter(bed => {
            // Handle if bed.hospital is an object or a string
            const bedHospitalId = typeof bed.hospital === "object" ? bed.hospital._id : bed.hospital;
            return bedHospitalId === AdminHospitalId;
          });
          setBedData(sortedBeds);
          console.log('Beds details fetched successfully:', sortedBeds);
        } catch (err) {
          console.error("Error fetching bed data:", err);
        }
      };
      fetchBedData();
    }
  }, [admin]);

  const normalizeStatus = (status) => status ? status.trim().toLowerCase() : '';

  const occupiedBeds = bedData.filter(item => {
    const status = normalizeStatus(item.status);
    return status === 'occupied' || status === 'not available';
  }).length;

  const availableBeds = bedData.filter(item => {
    const status = normalizeStatus(item.status);
    return status === 'available' || status.includes('avail');
  }).length;

  const reservedBeds = bedData.filter(item => {
    const status = normalizeStatus(item.status);
    return status === 'reserved';
  }).length;

  const underMaintenanceBeds = bedData.filter(item => {
    const status = normalizeStatus(item.status);
    return status === 'under maintenance' || status === 'under observation';
  }).length;

  const bedOccupancyData = {
    labels: ['Occupied', 'Available', 'Reserved', 'Under Maintenance'],
    datasets: [{
      data: [occupiedBeds, availableBeds, reservedBeds, underMaintenanceBeds],
      backgroundColor: ['#F44336', '#4CAF50', '#9E9E9E', '#FFEB3B'],
    }]
  };

  return (
    <motion.div 
      className="bg-white p-4 rounded-lg shadow-lg border border-gray-200" 
      whileHover={{ scale: 1.01 }}
    >
      <h4 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
        <FaBed /> Bed Occupancy
      </h4>
      <Pie data={bedOccupancyData} />
    </motion.div>
  );
};

export default BedOccupancyCard;
