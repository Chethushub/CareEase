import React from 'react';
import SchedulesCard from './SchedulesCard';
import HealthTipsCard from './HealthTipsCard';
import BillsCard from './BillsCard';
import MedicalRecordsCard from './MedicalRecordsCard';
import HealthStatsCard from './HealthStatsCard';
import TreatmentsCard from './TreatmentsCard';

const Dashboard = () => (
  <div className="min-h-screen bg-gray-50 p-6">
    <header className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Good Morning, Rohan!</h1>
      <p className="text-sm font-bold text-gray-600">Today is Tuesday, 12-Nov-2024</p>
    </header>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <SchedulesCard />
      <HealthTipsCard />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 gap-6">
      <BillsCard />
      <div className="grid grid-row-1 lg:grid-rows-2 gap-6">
        <MedicalRecordsCard />
        <HealthStatsCard />
      </div>
      <TreatmentsCard />
    </div>
  </div>
);

export default Dashboard;
