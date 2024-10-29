import React from 'react';
import './Sidebar.css';

const PtSidebar = ({ activeItem }) => {
  return (
    <div className="sidebar">
      <div className="logo">LOGO</div>
      <nav>
        <ul>
          <li className={activeItem === 'Dashboard' ? 'active' : ''}>
            <img src="/src/public/icons/dashboard.svg" alt="Dashboard"/>Dashboard
          </li>
          <li className={activeItem === 'Book-appointment' ? 'active' : ''}>
            <img src="/src/public/icons/reservation.svg" alt="Book-appointment"/>Book Appointment
          </li>
          <li className={activeItem === 'Schedules' ? 'active' : ''}>
            <img src="/src/public/icons/frame.svg" alt="Schedules"/>Schedules
          </li>
          <li className={activeItem === 'Messages' ? 'active' : ''}>
            <img src="/src/public/icons/message.svg" alt="Messages"/>Messages
          </li>
          <li className={activeItem === 'Medical-record' ? 'active' : ''}>
            <img src="/src/public/icons/medrec.svg" alt="Medical-record"/>Medical Record
          </li>
          <li className={activeItem === 'Settings' ? 'active' : ''}>
            <img src="/src/public/icons/setting.svg" alt="Settings"/>Settings
          </li>
          <li className={activeItem === 'Reports' ? 'active' : ''}>
            <img src="/src/public/icons/report.svg" alt="Reports"/>Reports
          </li>
         </ul>
      </nav>
    </div>
  );
};

export default PtSidebar;
