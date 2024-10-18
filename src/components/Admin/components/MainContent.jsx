import React from 'react';
import './MainContent.css';

const MainContent = () => {
  return (
    <div className="main-content">
      <h3 style={{fontWeight:'bolder',marginBottom:'5px'}}>Good Morning, User Name!</h3>
      <p style={{fontWeight:'lighter'}}>Friday, November 14, 2024</p>
      <div className="dashboard-cards">
 
        <div className="card appointments">Appointments</div>
        <div className="card patient-department">Patient Department</div>

        <div className="card small-card bills">Bills</div>
        <div className="card small-card popular-treatments">Popular Treatments</div>
        <div className="card small-card beds-availability">Beds Availability</div>
      </div>
    </div>
  );
};

export default MainContent;
