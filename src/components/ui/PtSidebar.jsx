import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Keep this if you still use some custom CSS

const PtSidebar = ({ activeItem, setActiveItem }) => {
  return (
    <div className="sidebar">
      <div className="logo">LOGO</div>
      <nav>
        <ul>

          <NavLink
            to="/patient"
            className={`text-gray-800 font-semibold  flex items-center  cursor-pointer hover:font-bold rounded-lg px-3 py-2 my-2 ${activeItem === 'Dashboard' ? 'bg-white font-bold' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveItem('Dashboard')}
          >
            <img src="./icons/dashboard.svg" alt="Dashboard" className="mr-2" />
            Dashboard
          </NavLink>

          <div className="section-header font-bold text-gray-600 my-4">Main</div>

          <NavLink
            to="/patient-book-appointment"
            className={`text-gray-800 font-semibold  flex items-center  cursor-pointer  hover:bg-white hover:font-bold rounded-lg px-3 py-2 my-2 ${activeItem === 'Book-appointment' ? 'bg-white font-bold' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveItem('Book-appointment')}
          >
            <img src="./icons/reservation.svg" alt="Book Appointment" className="mr-2" />
            Book Appointment
          </NavLink>

          <NavLink
            to="/patient-schedules"
            className={`text-gray-800 font-semibold  flex items-center  cursor-pointer  hover:bg-white hover:font-bold rounded-lg px-3 py-2 my-2 ${activeItem === 'Schedules' ? 'bg-white font-bold' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveItem('Schedules')}
          >
            <img src="./icons/frame.svg" alt="Schedules" className="mr-2" />
            Schedules
          </NavLink>

          <NavLink
            to="/patient-messages"
            className={`text-gray-800 font-semibold  flex items-center  cursor-pointer  hover:bg-white hover:font-bold rounded-lg px-3 py-2 my-2 ${activeItem === 'Messages' ? 'bg-white font-bold' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveItem('Messages')}
          >
            <img src="./icons/message.svg" alt="Messages" className="mr-2" />
            Messages
          </NavLink>

          <NavLink
            to="/patient-medical-record"
            className={`text-gray-800 font-semibold  flex items-center  cursor-pointer  hover:bg-white hover:font-bold rounded-lg px-3 py-2 my-2 ${activeItem === 'Medical-record' ? 'bg-white font-bold' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveItem('Medical-record')}
          >
            <img src="./icons/medrec.svg" alt="Medical Record" className="mr-2" />
            Medical Record
          </NavLink>

          <div className="section-header font-bold text-gray-600 my-4">Others</div>


          <NavLink
            to="/patient-settings"
            className={`text-gray-800 font-semibold  flex items-center  cursor-pointer  hover:bg-white hover:font-bold rounded-lg px-3 py-2 my-2 ${activeItem === 'Settings' ? 'bg-white font-bold' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveItem('Settings')}
          >
            <img src="./icons/setting.svg" alt="Settings" className="mr-2" />
            Settings
          </NavLink>

          <NavLink
            to="/patient-reports"
            className={`text-gray-800 font-semibold  flex items-center  cursor-pointer  hover:bg-white hover:font-bold rounded-lg px-3 py-2 my-2 ${activeItem === 'Reports' ? 'bg-white font-bold' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveItem('Reports')}
          >
            <img src="./icons/report.svg" alt="Reports" className="mr-2" />
            Reports
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default PtSidebar;
