import React, { useMemo } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import initialData from './data';
import { motion } from "framer-motion"


const NewPatientsCard = ({ timeframe, onTimeframeChange }) => {
  const newPatientCount = useMemo(
    () => initialData.newPatients.filter(patient => patient.firstVisit).length,
    []
  );
  const oldPatientCount = initialData.newPatients.length - newPatientCount;

  return (
    <motion.div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200" whileHover={{ scale: 1.01}}>
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
          <FaUserPlus /> New Patients
        </h4>
        <div className="flex space-x-2">
          <button onClick={() => onTimeframeChange('newPatients', 'weeks')} className={`px-2 py-1 rounded ${timeframe.newPatients === 'weeks' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>Weeks</button>
          <button onClick={() => onTimeframeChange('newPatients', 'months')} className={`px-2 py-1 rounded ${timeframe.newPatients === 'months' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>Months</button>
        </div>
      </div>
      <div className="text-center">
        <p className="text-2xl font-semibold text-gray-800">{newPatientCount}</p>
        <p className="text-sm text-gray-500">New Patients</p>
        <p className="text-sm text-gray-500">{oldPatientCount} Old Patients</p>
      </div>
    </motion.div>
  );
};

export default NewPatientsCard;
