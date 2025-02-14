import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { FaChartLine } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const PatientDepartmentsCard = ({adminId}) => {
  const [appointments, setAppointments] = useState([]);

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

        const fetchAppointments = async () => {
          try {
            const response = await axios.get(`${BACKEND_URL}/api/appointments`);

            const sortAppointments = response.data.filter(
              (appt) => appt?.hospital && appt.hospital._id === AdminHospitalId
            );
          console.log("patientAppointments data: ", sortAppointments); 
            setAppointments(sortAppointments);
          } catch (error) {
            console.error("Error fetching appointments:", error);
          }
        };
    
        fetchAppointments();
      }
    }, [admin]);  

  const departmentCounts = appointments.reduce((acc, appointment) => {
    acc[appointment.type] = (acc[appointment.type] || 0) + 1;
    return acc;
  }, {});

  const departmentNames = Object.keys(departmentCounts);
  const departmentValues = Object.values(departmentCounts);

  const generateColors = (num) =>
    Array.from({ length: num }, (_, i) => `hsl(${(i * 360) / num}, 70%, 50%)`);

  const backgroundColors = generateColors(departmentNames.length);

  const pieData = {
    labels: departmentNames,
    datasets: [
      {
        data: departmentValues,
        backgroundColor: backgroundColors,
      },
    ],
  };

  return (
    <motion.div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200" whileHover={{ scale: 1.01 }}>
      <h4 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
        <FaChartLine /> Patient Departments
      </h4>
      {appointments.length > 0 ? (
        <Pie data={pieData} />
      ) : (
        <p className="text-gray-500 text-sm mt-2">No data available</p>
      )}
    </motion.div>
  );
};

export default PatientDepartmentsCard;
