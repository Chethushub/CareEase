import React, { useState, useEffect } from 'react';
import SchedulesCard from './SchedulesCard';
import HealthTipsCard from './HealthTipsCard';
import BillsCard from './BillsCard';
import MedicalRecordsCard from './MedicalRecordsCard';
import HealthStatsCard from './HealthStatsCard';
import TreatmentsCard from './TreatmentsCard';

import axios from 'axios';
import { useParams } from 'react-router-dom';

const BACKEND_URL = "http://localhost:5000";

const Dashboard = () => {
  const { userId } = useParams();  
  const [patientData, setPatientData] = useState(null);
  
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/patients/${userId}`);
        setPatientData(response.data);
        console.log("Patient " + JSON.stringify(response.data));
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
    return `${weekday}, ${day}-${month}-${year}`;
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const [currentDate, setCurrentDate] = useState(getDate());
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(getDate());
      setGreeting(getGreeting());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!patientData) {
    return <div>Loading patient data...</div>;  
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{`${greeting}, ${patientData.name}`}</h1>
        <p className="text-sm font-bold text-gray-600">Today is {currentDate}</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <SchedulesCard patientId={userId} />
        <HealthTipsCard />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 gap-6">
        <BillsCard patientId={userId}/>
        <div className="grid grid-row-1 lg:grid-rows-2 gap-6">
          <MedicalRecordsCard />
          <HealthStatsCard />
        </div>
        <TreatmentsCard patientId={userId}/>
      </div>
    </div>
  );
};

export default Dashboard;
