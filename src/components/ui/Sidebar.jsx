import React, { useState } from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <div className="sidebar">
      <div className="logo">LOGO</div>
      <div className="hospital-name">
        <NavLink to="/patient" className="flex items-center">
          <button className="flex items-center">
            <img src="./icons/Hospital-icon.svg" alt="Hospital" className="mr-2" />
            Hospital Name
          </button>
        </NavLink>
      </div>

      <nav>
        <ul>
          <NavLink
            to="/"
            className={`${activeItem === 'Dashboard' ? 'bg-white font-bold' : 'hover:bg-gray-200'}
             text-gray-800 font-semibold  flex items-center  cursor-pointer  hover:bg-white hover:font-bold rounded-lg px-3 py-2 my-2`}
            onClick={() => setActiveItem('Dashboard')}
          >
            <img src="./icons/dashboard.svg" alt="Dashboard" className="mr-2" /> Dashboard
          </NavLink>

          <div className="section-header font-bold text-gray-600 my-4">Clinic</div>

          <NavLink
            to="/admin-reservations"
            className={`${activeItem === 'Reservations' ? 'bg-white font-bold' : 'hover:bg-gray-200'}
             text-gray-800 font-semibold  flex items-center  cursor-pointer  hover:bg-white hover:font-bold rounded-lg px-3 py-2 my-2`}
            onClick={() => setActiveItem('Reservations')}
          >
            <img src="./icons/reservation.svg" alt="Reservations" className="mr-2" /> Reservations
          </NavLink>

          <NavLink
            to="/admin-beds"
            className={`${activeItem === 'Beds' ? 'bg-white font-bold' : 'hover:bg-gray-200'}
             text-gray-800 font-semibold  flex items-center  cursor-pointer  hover:bg-white hover:font-bold rounded-lg px-3 py-2 my-2`}
            onClick={() => setActiveItem('Beds')}
          >
            <img src="./icons/beds.svg" alt="Beds" className="mr-2" /> Beds availability
          </NavLink>

          <NavLink
            to="/admin-staff"
            className={`${activeItem === 'Staff' ? 'bg-white font-bold' : 'hover:bg-gray-200'}
             text-gray-800 font-semibold  flex items-center  cursor-pointer  hover:bg-white hover:font-bold rounded-lg px-3 py-2 my-2`}
            onClick={() => setActiveItem('Staff')}
          >
            <img src="./icons/staff.svg" alt="Staff" className="mr-2" /> Staff List
          </NavLink>

          <NavLink
            to="/admin-treatment"
            className={`${activeItem === 'Treatment' ? 'bg-white font-bold' : 'hover:bg-gray-200'}
             text-gray-800 font-semibold  flex items-center  cursor-pointer  hover:bg-white hover:font-bold rounded-lg px-3 py-2 my-2`}
            onClick={() => setActiveItem('Treatment')}
          >
            <img src="./icons/dashboard.svg" alt="Treatment" className="mr-2" /> Treatment
          </NavLink>

          <div className="section-header font-bold text-gray-600 my-4">Finance</div>

          <NavLink
            to="/admin-sales"
            className={`${activeItem === 'Sales' ? 'bg-white font-bold' : 'hover:bg-gray-200'}
             text-gray-800 font-semibold  flex items-center  cursor-pointer  hover:bg-white hover:font-bold rounded-lg px-3 py-2 my-2`}
            onClick={() => setActiveItem('Sales')}
          >
            <img src="./icons/reports.svg" alt="Sales" className="mr-2" /> Sales
          </NavLink>

          <div className="section-header font-bold text-gray-600 my-4">Others</div>

          <NavLink
            to="/admin-reports"
            className={`${activeItem === 'Reports' ? 'bg-white font-bold' : 'hover:bg-gray-200'}
             text-gray-800 font-semibold  flex items-center  cursor-pointer  hover:bg-white hover:font-bold rounded-lg px-3 py-2 my-2`}
            onClick={() => setActiveItem('Reports')}
          >
            <img src="./icons/reports.svg" alt="Reports" className="mr-2" /> Reports
          </NavLink>

          <NavLink
            to="/admin-support"
            className={`${activeItem === 'Support' ? 'bg-white font-bold' : 'hover:bg-gray-200'}
             text-gray-800 font-semibold  flex items-center  cursor-pointer  hover:bg-white hover:font-bold rounded-lg px-3 py-2 my-2`}
            onClick={() => setActiveItem('Support')}
          >
            <img src="./icons/support.svg" alt="Support" className="mr-2" /> Customer Support
          </NavLink>

        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
