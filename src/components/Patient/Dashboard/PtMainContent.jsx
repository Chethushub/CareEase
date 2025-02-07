import React, {useState, useEffect} from 'react';
import SchedulesCard from './SchedulesCard';
import HealthTipsCard from './HealthTipsCard';
import BillsCard from './BillsCard';
import MedicalRecordsCard from './MedicalRecordsCard';
import HealthStatsCard from './HealthStatsCard';
import TreatmentsCard from './TreatmentsCard';

import axios from 'axios';
import { useParams } from 'react-router-dom';

const BACKEND_URL = "http://localhost:5000"

const Dashboard = () => {
  const { userId } = useParams();  
  const [patientData, setpatientData] = useState(null);

      useEffect(() => {
          const fetchPatientData = async () => {
            try {
              const response = await axios.get(`${BACKEND_URL}/api/patients/${userId}`);
                setpatientData(response.data);
                
                console.log("Patient " + JSON.stringify(response.data));

            } catch (error) {
              console.error("Error fetching patient data:", error);
            }
          };
      
          fetchPatientData();
        }, [userId]);

        if (!patientData) {
          return <div>Loading patient data...</div>;  
        }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{`Good Morning, ${patientData.name}`}</h1>
        <p className="text-sm font-bold text-gray-600">Today is Sunday, 02-Feb-2025</p>
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
        <TreatmentsCard />
      </div>
    </div>
  )
};

export default Dashboard;
