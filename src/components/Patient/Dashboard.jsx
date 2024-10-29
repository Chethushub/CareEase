import React from "react";
import PtSidebar from "/src/components/ui/PtSidebar";
import PtHeader from "/src/components/ui/PtHeader";
import PtMainDashboard from "/src/components/ui/PtMainContent";

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
