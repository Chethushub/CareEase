import React, { useState } from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ activeItem }) => {
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

      <div className="hospital-name">
        <NavLink to="/patient-dashboard" className="flex items-center">
          <button className="flex items-center">
            <img src="./icons/Hospital-icon.svg" alt="Hospital" className="mr-2" />
            {!isCollapsed && 'Hospital Name'}
          </button>
        </NavLink>
      </div>

      <nav>
        <ul>
          <NavLink
            to="/admin-dashboard"
            className={`${activeItem === 'Dashboard' ? 'bg-white font-bold' : 'hover:bg-gray-200'}
             text-gray-800 font-semibold flex items-center cursor-pointer hover:bg-white hover:font-bold rounded-lg px-3 py-2 my-2`}
          >
            <img src="./icons/dashboard.svg" alt="Dashboard" className="mr-2" /> {!isCollapsed && 'Dashboard'}
          </NavLink>

          {!isCollapsed && <div className="section-header font-bold text-gray-600 my-4">Clinic</div>}

          <NavLink
            to="/admin-reservations"
            className={`${activeItem === 'Reservations' ? 'bg-white font-bold' : 'hover:bg-gray-200'}
             text-gray-800 font-semibold flex items-center cursor-pointer hover:bg-white hover:font-bold rounded-lg px-3 py-2 my-2`}
          >
            <img src="./icons/reservation.svg" alt="Reservations" className="mr-2" /> {!isCollapsed && 'Reservations'}
          </NavLink>

          <NavLink
            to="/admin-beds"
            className={`${activeItem === 'Beds' ? 'bg-white font-bold' : 'hover:bg-gray-200'}
             text-gray-800 font-semibold flex items-center cursor-pointer hover:bg-white hover:font-bold rounded-lg px-3 py-2 my-2`}
          >
            <img src="./icons/beds.svg" alt="Beds" className="mr-2" /> {!isCollapsed && 'Beds availability'}
          </NavLink>

          <NavLink
            to="/admin-staff"
            className={`${activeItem === 'Staff' ? 'bg-white font-bold' : 'hover:bg-gray-200'}
             text-gray-800 font-semibold flex items-center cursor-pointer hover:bg-white hover:font-bold rounded-lg px-3 py-2 my-2`}
          >
            <img src="./icons/staff.svg" alt="Staff" className="mr-2" /> {!isCollapsed && 'Staff List'}
          </NavLink>

          <NavLink
            to="/admin-treatment"
            className={`${activeItem === 'Treatment' ? 'bg-white font-bold' : 'hover:bg-gray-200'}
             text-gray-800 font-semibold flex items-center cursor-pointer hover:bg-white hover:font-bold rounded-lg px-3 py-2 my-2`}
          >
            <img src="./icons/treatment.svg" alt="Treatment" className="mr-2" /> {!isCollapsed && 'Treatment'}
          </NavLink>

          {!isCollapsed && <div className="section-header font-bold text-gray-600 my-4">Finance</div>}

          <NavLink
            to="/admin-sales"
            className={`${activeItem === 'Sales' ? 'bg-white font-bold' : 'hover:bg-gray-200'}
             text-gray-800 font-semibold flex items-center cursor-pointer hover:bg-white hover:font-bold rounded-lg px-3 py-2 my-2`}
          >
            <img src="./icons/bills.svg" alt="Sales" className="mr-2" /> {!isCollapsed && 'Bills'}
          </NavLink>

          {!isCollapsed && <div className="section-header font-bold text-gray-600 my-4">Others</div>}

          <NavLink
            to="/admin-reports"
            className={`${activeItem === 'Reports' ? 'bg-white font-bold' : 'hover:bg-gray-200'}
             text-gray-800 font-semibold flex items-center cursor-pointer hover:bg-white hover:font-bold rounded-lg px-3 py-2 my-2`}
          >
            <img src="./icons/report.svg" alt="Reports" className="mr-2" /> {!isCollapsed && 'Reports'}
          </NavLink>

          <NavLink
            to="/admin-support"
            className={`${activeItem === 'Support' ? 'bg-white font-bold' : 'hover:bg-gray-200'}
             text-gray-800 font-semibold flex items-center cursor-pointer hover:bg-white hover:font-bold rounded-lg px-3 py-2 my-2`}
          >
            <img src="./icons/support.svg" alt="Support" className="mr-2" /> {!isCollapsed && 'Customer Support'}
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
