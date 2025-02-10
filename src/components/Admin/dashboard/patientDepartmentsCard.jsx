import React from 'react';
import { Pie } from 'react-chartjs-2';
import { FaChartLine } from 'react-icons/fa';
import initialData from './data';
import { motion } from "framer-motion"


const PatientDepartmentsCard = ({adminId}) => {
  const pieData = {
    labels: initialData.patientDepartments.map(dept => dept.name),
    datasets: [{
      data: initialData.patientDepartments.map(dept => dept.visits),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
    }]
  };

  return (
    <motion.div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200" whileHover={{ scale: 1.01 }}>
      <h4 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
        <FaChartLine /> Patient Departments
      </h4>
      <Pie data={pieData} />
    </motion.div>
  );
};

export default PatientDepartmentsCard;
