import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { FaChartLine } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";

const PatientDepartmentsCard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/appointments");
        const patientAppointments = response.data;
        console.log("patientAppointments data: ", patientAppointments);
        setAppointments(patientAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

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
