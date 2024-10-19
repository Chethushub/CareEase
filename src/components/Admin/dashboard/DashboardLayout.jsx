import React from 'react';
import Sidebar from '/src/components/components/Sidebar';
import Header from '/src/components/components/Header';
import MainContent from '/src/components//components/MainContent';
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
