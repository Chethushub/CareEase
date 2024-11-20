import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Sidebar from "./components/ui/Sidebar"
import Header from "./components/ui/Header"
import PtSidebar from "./components/ui/PtSidebar"
import PtHeader from "./components/ui/PtHeader"
import { BrowserRouter as Router, useLocation } from 'react-router-dom';


function MainLayout() {
  const location = useLocation();

  const routeMap = {
    "/admin": { activeItem: "Dashboard", title: "Dashboard" },
    "/admin-dashboard": { activeItem: "Dashboard", title: "Dashboard" },
    "/admin-reservations": { activeItem: "Reservations", title: "Reservations" },
    "/admin-beds": { activeItem: "Beds", title: "Beds Availability" },
    "/admin-staff": { activeItem: "Staff", title: "Staff List" },
    "/admin-treatment": { activeItem: "Treatment", title: "Treatment" },
    "/admin-sales": { activeItem: "Sales", title: "Sales" },
    "/admin-reports": { activeItem: "Reports", title: "Reports" },
    "/admin-support": { activeItem: "Support", title: "Customer Support" },

    "/patient": { activeItem: "Dashboard", title: "Patient Dashboard" },
    "/patient-dashboard": { activeItem: "Dashboard", title: "Patient Dashboard" },
    "/patient-book-appointment": { activeItem: "Book-appointment", title: "Book Appointment" },
    "/patient-schedules": { activeItem: "Schedules", title: "Schedules" },
    "/patient-messages": { activeItem: "Messages", title: "Messages" },
    "/patient-medical-record": { activeItem: "Medical-record", title: "Medical Record" },
    "/patient-settings": { activeItem: "Settings", title: "Settings" },
    "/patient-reports": { activeItem: "Reports", title: "Reports" },
  };

  const { activeItem = "Dashboard", title = "Dashboard" } = routeMap[location.pathname] || {};

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isPatientRoute = location.pathname.startsWith("/patient");

  return (
    <>
      {!isAdminRoute && !isPatientRoute && <App />}

      {isAdminRoute && (
        <div className="dashboard-layout ">
          <Sidebar activeItem={activeItem} />
        
          <div className="main-section">
            <Header title={title} />
            <div className='overflow-y-auto '>
              <App />
            </div>
          </div>
          
        </div>
      )}

      {isPatientRoute && (
        <div className="dashboard-layout">
          <PtSidebar activeItem={activeItem} />
          <div className="main-section">
            <PtHeader title={title} />
            <div className='overflow-y-auto'>
              <App />
            </div>
          </div>
        </div>
      )}

    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <MainLayout />
    </Router>
  </StrictMode>
);