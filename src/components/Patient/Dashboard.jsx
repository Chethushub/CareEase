import React from "react";
import PtSidebar from "/src/components/components/PtSidebar";
import PtHeader from "/src/components/components/PtHeader";
import PtMainDashboard from "/src/components/components/PtMainContent";

function PatientDashboard() {
  return (
    <>
      <div className="dashboard-layout">
        <PtSidebar activeItem="Dashboard" />
        <div className="main-section">
          <PtHeader title="Dashboard" />
          <PtMainDashboard />
        </div>
      </div>
    </>
  );
}
export default PatientDashboard;
