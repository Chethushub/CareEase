import React from 'react';
import './Sidebar.css';
import hospital from './images/Hospital-icon.png';
import dashboard from './images/dashboard.png';
import reports from './images/reports.png';
import staff from './images/staff.png';
import support from './images/support.png';
import beds from './images/beds.png';
import reservation from './images/reservation.png';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">LOGO</div>
      <div className="hospital-name">
        <button><img src={hospital} alt="Hospital"/>Hospital Name</button>
      </div>
      <nav>
        <ul>
          <li><img src={dashboard} alt="Dashboard"/>Dashboard</li>
          <div className="section-header">Clinic</div>
          <li><img src={reservation} alt="Reservations"/>Reservations</li>
          <li><img src={beds} alt="Beds"/>Beds availability</li>
          <li><img src={staff} alt="Staff"/>Staff List</li>
          <li><img src={dashboard} alt="Treatment"/>Treatment</li>
          <div className="section-header">Finance</div>
          <li><img src={reports} alt="Sales"/>Sales</li>
          <div className="section-header">Others</div>
          <li><img src={reports} alt="Reports"/>Reports</li>
          <li><img src={support} alt="Support"/>Customer Support</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
