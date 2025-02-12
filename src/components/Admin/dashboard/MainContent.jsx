import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import AppointmentsCard from './appointmentsCard';
import BillsCard from './billsCard';
import PatientDepartmentsCard from './patientDepartmentsCard';
import TreatmentRatingsCard from './treatmentRatingsCard';
import NewPatientsCard from './newPatientsCard';
import BedOccupancyCard from './bedOccupancyCard';
import initialData from './data';

import axios from 'axios';
import { useParams } from 'react-router-dom';

import {
  Chart as ChartJS, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement
} from 'chart.js';

ChartJS.register(Tooltip, Legend, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const BACKEND_URL = "http://localhost:5000"

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeframe, setTimeframe] = useState({
    bills: 'weeks',
    appointment: 'weeks',
    newPatients: 'weeks',
  });

  const handleTimeframeChange = (key, value) => {
    setTimeframe((prev) => ({ ...prev, [key]: value }));
  };

    const { userId } = useParams();  
    const [adminData, setAdminData] = useState(" ");
    
    useEffect(() => {
      const fetchPatientData = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/admins/${userId}`);
          setAdminData(response.data);
          console.log("Admin: ", response.data);
        } catch (error) {
          console.error("Error fetching patient data:", error);
        }
      };
      fetchPatientData();
    }, [userId]);
    
  const getDate = () => {
    const date = new Date();
    const weekday = date.toLocaleString('default', { weekday: 'long' });
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `Today is ${weekday}, ${day}-${month}-${year}`;
  };

  const getGreeting = (() => {
    const today = new Date();
    const hour = today.getHours();
    let greeting = "Good Morning";

    if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon";
    } else if (hour >= 17) {
        greeting = "Good Evening";
    }
    return `${greeting}`
  })

  const [currentDate, setCurrentDate] = useState(getDate());
  const [greeting, setGreeting] = useState(() => getGreeting());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(getDate());
      setGreeting(getGreeting());
    }, 60000); 

    return () => clearInterval(interval); 
  }, []);
  

  
  return (
    <div className="dashboard bg-gray-100 min-h-screen p-6">
      <header className="flex justify-between items-center mb-6">
        <div>
        <h3 className="text-2xl font-bold text-gray-800">
          {`${greeting}, ${adminData?.name || ''}`}
        </h3>
          <p className="text-sm font-bold text-gray-500">{currentDate}</p>
        </div>

      </header>

      <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <AppointmentsCard timeframe={timeframe} onTimeframeChange={handleTimeframeChange} adminId={userId}/>
        <BillsCard timeframe={timeframe} onTimeframeChange={handleTimeframeChange} adminId={userId}/>
      </motion.div>

      <motion.div  className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <PatientDepartmentsCard adminId={userId}/>
        <motion.div  className="grid grid-rows-1 lg:grid-rows-2 gap-4">
          <TreatmentRatingsCard adminId={userId}/>
          <NewPatientsCard timeframe={timeframe} onTimeframeChange={handleTimeframeChange} adminId={userId}/>
        </motion.div >
        <BedOccupancyCard adminId={userId}/>
      </motion.div >
    </div>
  );
};

export default Dashboard;
