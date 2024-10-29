import React from 'react';
import './PtMainContent.css';

const PtMainContent = () => {
  return (
  <div className="main-content">
      <h3 style={{fontWeight:'bolder',marginBottom:'5px'}}>Good Morning, User Name!</h3>
      <p style={{fontWeight:'lighter'}}>Friday, November 14, 2024</p>
      <div className="dashboard-cards">
 
        <div className="card schedules">Schedules</div>
        <div className="card health-tips">Health Tips</div>

        <div className="card small-card bills">Bills</div>
        <div className="card small-card treatments">Treatments</div>
        <div className="card small-card medical-records">Medical Records</div>
      </div>
    </div>
  );
};
export default PtMainContent;