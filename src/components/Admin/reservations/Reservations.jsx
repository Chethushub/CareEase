import React from 'react';
import Sidebar from '/src/components/ui/Sidebar';
import Header from '/src/components/ui/Header';
import MainContent from './MainContent';
import './Reservation.css';

const Reservation = () => {
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

export default Reservation;
