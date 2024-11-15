import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHeartbeat, FaBed, FaCalendarAlt } from 'react-icons/fa';

const Sample = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-blue-600 text-white py-20">


        <div className="container mx-auto px-6 md:px-12 text-center">

          <div className="items-center flex justify-center cursor-pointer">
            <img src="./icons/logo.svg" alt="Logo" className='h-24 w-24 items-center' />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Welcome to CareEase
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Streamlining patient care and hospital management with innovative solutions.
          </p>

          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Get Started as
          </h2>

          <NavLink to="/admin" className="px-4">
            <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-md shadow-lg transition duration-300">
              Admin
            </button>
          </NavLink>

          <NavLink to="/patient" className="px-4">
            <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-md shadow-lg transition duration-300">
              Patient
            </button>
          </NavLink>

        </div>
      </section>

      {/* Features Section */}
      <section className="container bg-[#f3f4f6] mx-auto py-16 px-6 md:px-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
          Our Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white shadow-lg rounded-lg p-6 text-center transition duration-300 transform hover:scale-105">
            <FaHeartbeat className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Real-Time Queue Updates</h3>
            <p className="text-gray-600">
              Keep track of patient queues with live updates, reducing wait times and improving patient flow.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center transition duration-300 transform hover:scale-105">
            <FaBed className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Bed Availability Tracking</h3>
            <p className="text-gray-600">
              Monitor and manage bed availability efficiently to ensure optimal usage and faster patient admissions.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center transition duration-300 transform hover:scale-105">
            <FaCalendarAlt className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Online Appointment Scheduling</h3>
            <p className="text-gray-600">
              Allow patients to book appointments easily and receive reminders, enhancing the user experience.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Patient Care?
          </h2>
          <p className="mb-6">
            Join CareEase today and experience a revolution in hospital management.
          </p>
          <NavLink to="/signup" className="px-4">
            <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-md shadow-lg transition duration-300">
              Sign Up Now
            </button>
          </NavLink>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} CareEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Sample;
