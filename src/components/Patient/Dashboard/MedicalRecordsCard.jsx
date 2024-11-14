import React from 'react';
import { FaFileMedical } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { medicalRecords } from './data';

const MedicalRecordsCard = () => (
  <motion.div className="p-6 bg-white rounded-lg shadow-lg" whileHover={{ scale: 1.02 }}>
    <h2 className="flex items-center gap-2 text-blue-800 text-xl font-semibold">
      <FaFileMedical size={24} /> Medical Records
    </h2>
    <ul className="mt-4">
      {medicalRecords.map((record, index) => (
        <li key={index} className="mb-4">
          <p><strong>Date:</strong> {record.date}</p>
          <p><strong>Description:</strong> {record.description}</p>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default MedicalRecordsCard;
