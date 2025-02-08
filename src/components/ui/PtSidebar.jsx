import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const PtSidebar = ({ activeItem,  userId}) => {
  // const [activeItem, setActiveItem] = useState('Dashboard');
  
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };


  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="toggle-button" onClick={toggleSidebar}>
        <img
          src={isCollapsed ? "./icons/right-arrow-circle-icon.svg" : "./icons/left-arrow-circle-icon.svg"}
          alt="Toggle Arrow"
          className="absolute top-6 right-[-14px] transform cursor-pointer z-10"
        />
      </div>
      <NavLink to="/">
        <div className="logo flex items-center">
          <img src="./icons/logo.svg" alt="Logo" className='h-16 w-16' />
          <p>{!isCollapsed && 'CareEase'}</p>
        </div>
      </NavLink>

      <nav>
        <ul>

          <NavLink
            to={`/patient/${userId}`}
            className={`text-gray-800 font-semibold  flex items-center  cursor-pointer hover:font-bold rounded-lg px-3 py-2 my-2 
              ${activeItem === 'Dashboard' ? 'bg-white font-bold' : 'hover:bg-gray-200'}`}
          >
            <img src="./icons/dashboard.svg" alt="Dashboard" className="mr-2" />
            {!isCollapsed && 'Dashboard'}
          </NavLink>

          <div className="section-header font-bold text-gray-600 my-4">Main</div>

          <NavLink
            to={`/patient-book-appointment/${userId}`}
            className={`text-gray-800 font-semibold  flex items-center  cursor-pointer  hover:bg-white hover:font-bold rounded-lg px-3 py-2 my-2 
              ${activeItem === 'Book-appointment' ? 'bg-white font-bold' : 'hover:bg-gray-200'}`}
          >
            <img src="./icons/reservation.svg" alt="Book Appointment" className="mr-2" />
            {!isCollapsed && 'Book Appointment'}
          </NavLink>

          <NavLink
            to={`/patient-schedules/${userId}`}
            className={`text-gray-800 font-semibold  flex items-center  cursor-pointer  hover:bg-white hover:font-bold rounded-lg px-3 py-2 my-2 
              ${activeItem === 'Schedules' ? 'bg-white font-bold' : 'hover:bg-gray-200'}`}
          >
            <img src="./icons/Schedules.svg" alt="Schedules" className="mr-2" />
            {!isCollapsed && 'Schedules'}
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default PtSidebar;
