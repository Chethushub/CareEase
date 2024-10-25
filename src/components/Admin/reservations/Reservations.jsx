import React from 'react';
import Sidebar from '/src/components/components/Sidebar';
import Header from '/src/components/components/Header';
import MainContent from './MainContent';
import './Reservation.css';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar activeItem="Reservations"/>
      <div className="main-section">
        <Header title="Reservations"/>
        <MainContent />
      </div>
    </div>
  );
};

export default DashboardLayout;
