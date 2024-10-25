import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeItem }) => {
  return (
    <div className="sidebar">
      <div className="logo">LOGO</div>
      <div className="hospital-name">
        <button><img src="/src/public/icons/Hospital-icon.svg" alt="Hospital"/>Hospital Name</button>
      </div>
      <nav>
        <ul>
          <li className={activeItem === 'Dashboard' ? 'active' : ''}>
            <img src="/src/public/icons/dashboard.svg" alt="Dashboard"/>Dashboard
          </li>
          <div className="section-header">Clinic</div>
          <li className={activeItem === 'Reservations' ? 'active' : ''}>
            <img src="/src/public/icons/reservation.svg" alt="Reservations"/>Reservations
          </li>
          <li className={activeItem === 'Beds' ? 'active' : ''}>
            <img src="/src/public/icons/beds.svg" alt="Beds"/>Beds availability
          </li>
          <li className={activeItem === 'Staff' ? 'active' : ''}>
            <img src="/src/public/icons/staff.svg" alt="Staff"/>Staff List
          </li>
          <li className={activeItem === 'Treatment' ? 'active' : ''}>
            <img src="/src/public/icons/dashboard.svg" alt="Treatment"/>Treatment
          </li>
          <div className="section-header">Finance</div>
          <li className={activeItem === 'Sales' ? 'active' : ''}>
            <img src="/src/public/icons/reports.svg" alt="Sales"/>Sales
          </li>
          <div className="section-header">Others</div>
          <li className={activeItem === 'Reports' ? 'active' : ''}>
            <img src="/src/public/icons/reports.svg" alt="Reports"/>Reports
          </li>
          <li className={activeItem === 'Support' ? 'active' : ''}>
            <img src="/src/public/icons/support.svg" alt="Support"/>Customer Support
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
