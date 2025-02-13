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
import { matchPath } from "react-router-dom";


import axios from 'axios'
import { UserProvider } from './UserContext'
import { useUser } from './UserContext';

function MainLayout() {
  const location = useLocation();

  const { userId, setUserId } = useUser();

  useEffect(() => {
    const routes = [
      '/admin/:userId',
      '/admin-dashboard/:userId',
      '/admin-reservations/:userId',
      "/admin-beds/:userId",
      '/admin-staff/:userId',
      '/admin-treatment/:userId',
      '/admin-profile/:userId',
      '/patient/:userId',
      '/patient-book-appointment/:userId',
      '/patient-schedules/:userId',
      '/patient-profile/:userId',
    ];

    // Iterate over each route and check if userId is present
    for (let route of routes) {
      if (!userId) {
        const userIdMatch = location.pathname.match(new RegExp(`^${route.replace(':userId', '([a-fA-F0-9]{24})')}$`));
        if (userIdMatch) {
          setUserId(userIdMatch[1]);  // Set userId from the matched URL
          break; 
        }
      }
    }

  }, [location.pathname, setUserId, userId]); 
  

  const routeMap = {
    "/admin": { activeItem: "Dashboard", title: "Dashboard" },
    "/admin/:userId": { activeItem: "Dashboard", title: "Dashboard" },
    "/admin-dashboard/:userId": { activeItem: "Dashboard", title: "Dashboard" },
    "/admin-reservations/:userId": { activeItem: "Reservations", title: "Reservations" },
    "/admin-beds/:userId": { activeItem: "Beds", title: "Beds Availability" },
    "/admin-staff/:userId": { activeItem: "Staff", title: "Staff List" },
    "/admin-treatment/:userId": { activeItem: "Treatment", title: "Treatment" },
    "/admin-sales/:userId": { activeItem: "Sales", title: "Sales" },
    "/admin-reports/:userId": { activeItem: "Reports", title: "Reports" },
    "/admin-support/:userId": { activeItem: "Support", title: "Customer Support" },
    "/admin-profile/:userId" :{activeItem:"Profile",title :"Profile"},

    "/patient/:userId": { activeItem: "Dashboard", title: "Patient Dashboard" },
    "/patient-book-appointment/:userId": { activeItem: "Book-appointment", title: "Book Appointment" },
    "/patient-schedules/:userId": { activeItem: "Schedules", title: "Schedules" },
  };


  const findRouteMatch = (pathname) => {
    for (const [route, data] of Object.entries(routeMap)) {
      if (matchPath(route.replace(":userId", "*"), pathname)) {
        return data;
      }
    }
    return { activeItem: "Dashboard", title: "Dashboard" }; 
  };
  
  const { activeItem, title } = findRouteMatch(location.pathname);
  
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

      {console.log("admin id in main: ", userId)}

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