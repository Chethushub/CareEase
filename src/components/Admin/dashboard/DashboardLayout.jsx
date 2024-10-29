import React from 'react';
import Sidebar from '/src/components/ui/Sidebar';
import Header from '/src/components/ui/Header';
import MainContent from '/src/components/ui/MainContent';
import './DashboardLayout.css';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar activeItem="Dashboard"/>
      <div className="main-section">
        <Header title="Dashboard"/>
        <MainContent />
      </div>
    </div>
  );
};

export default DashboardLayout;
