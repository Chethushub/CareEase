import React from 'react';
import './MainContent.css';

const MainContent = () => {
  return (
    <div className="reservations-main">
     
      <div className="calendar-header">
        <div className="appointments-info">
          <span className="calendar-icon">&#128197;</span>
          <span className="total-appointments">16 total appointments</span>
        </div>
        <div className="date-info">
            <div style={{fontWeight:'lighter'}}>
          <button className="prev-date">&lt;</button>&nbsp;
          <button className="next-date">&gt;</button></div>
          <span>Sat, 17 Nov 2024</span>
        </div>
        <div className="filters">
          <select className="doctor-filter">
            <option value="all">All Doctors</option>
          </select>
          <button className="filter-btn">Filters</button>
        </div>
      </div>

      <div className="appointments-grid">
        <div className="doctor-appointments">
          <div className="doctor-info" style={{display:'inline-block'}}>
          <img src="/src/public/icons/Profile_icon.svg" alt="Profile"/>
            <span className="doctor-name">Dr Mohan das</span><br/>
            <span className="patients-info">Today's appointment <strong>6 patient(s)</strong></span>
          </div>
          <div className="appointment-slot">
            <span className="time-slot">9:00 am</span>
            <div className="patient-card">
              <input type="checkbox" checked />
              <div className="patient-info">
                <span className="patient-name">Shekar nayak</span>
                <span className="appointment-time">9:00 AM - 9:15 AM</span>
                <span className="treatment">General Checkup</span>
              </div>
              <span className="status">Finished</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default MainContent;
