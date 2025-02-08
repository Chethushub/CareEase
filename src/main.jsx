import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Sidebar from "./components/ui/Sidebar"
import Header from "./components/ui/Header"
import PtSidebar from "./components/ui/PtSidebar"
import PtHeader from "./components/ui/PtHeader"
import { useParams } from "react-router-dom";
import Navbar from "./components/navbar"
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

import axios from 'axios'
import { UserProvider } from './UserContext'
import { useUser } from './UserContext';

function MainLayout() {
  const location = useLocation();

  const { userId, setUserId } = useUser();

  useEffect(() => {
    const userIdMatch = location.pathname.match(/\/patient\/([a-fA-F0-9]{24})/);
    if (userIdMatch) {
      setUserId(userIdMatch[1]);
    }

    if(!userId) {
      const userIdMatch = location.pathname.match(/\/admin\/([a-fA-F0-9]{24})/);
      if (userIdMatch) {
        setUserId(userIdMatch[1]);
      }
    }

  }, [location.pathname, setUserId]);
  

  const routeMap = {
    "/admin": { activeItem: "Dashboard", title: "Dashboard" },
    "/admin/:userId": { activeItem: "Dashboard", title: "Dashboard" },
    "/admin-dashboard": { activeItem: "Dashboard", title: "Dashboard" },
    "/admin-reservations": { activeItem: "Reservations", title: "Reservations" },
    "/admin-beds": { activeItem: "Beds", title: "Beds Availability" },
    "/admin-staff": { activeItem: "Staff", title: "Staff List" },
    "/admin-treatment": { activeItem: "Treatment", title: "Treatment" },
    "/admin-sales": { activeItem: "Sales", title: "Sales" },
    "/admin-reports": { activeItem: "Reports", title: "Reports" },
    "/admin-support": { activeItem: "Support", title: "Customer Support" },
    "/admin-profile" :{activeItem:"Profile",title :"Profile"},

    "/patient/:userId": { activeItem: "Dashboard", title: "Patient Dashboard" },
    "/patient-book-appointment/:userId": { activeItem: "Book-appointment", title: "Book Appointment" },
    "/patient-schedules/:userId": { activeItem: "Schedules", title: "Schedules" },
  };

  const { activeItem = "Dashboard", title = "Dashboard" } = routeMap[location.pathname] || {};

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isPatientRoute = location.pathname.startsWith("/patient");

  return (
    <>
      {!isAdminRoute && !isPatientRoute && (
        // <div className="dashboard-layout ">
          <div className="main-section">
            <Navbar />
            <div className='overflow-y-auto '>
              <App />
            </div>
          {/* </div> */}
        </div>
      )}

      {isAdminRoute && (
        <div className="dashboard-layout ">
          <Sidebar activeItem={activeItem} adminId={userId} />

          <div className="main-section">
            <Header title={title} adminId={userId}/>
            <div className='overflow-y-auto '>
              <App />
            </div>
          </div>

        </div>
      )}

      {isPatientRoute && (
        <div className="dashboard-layout">
          <PtSidebar activeItem={activeItem} userId={userId}/>
          <div className="main-section">
            <PtHeader title={title} patientId={userId}/>
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
      <UserProvider>
        <MainLayout />
      </UserProvider>
    </Router>
  </StrictMode>
);