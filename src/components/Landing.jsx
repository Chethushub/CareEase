import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHeartbeat, FaBed, FaCalendarAlt } from 'react-icons/fa';

const Landing = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-blue-700 to-green-600 text-white py-20">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to CareEase</h1>
          <p className="text-lg md:text-xl mb-6">Streamlining patient care and hospital management with innovative solutions.</p>
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Get Started as</h2>
          <div className="flex justify-center gap-4">
            <NavLink to="/admin">
              <button className="bg-gradient-to-r from-green-600 to-green-500  hover:shadow-xl hover:scale-105 text-white font-medium py-3 px-8 rounded-md shadow-lg transition duration-300">
                Admin
              </button>
            </NavLink>
            <NavLink to="/patient">
              <button className="bg-gradient-to-r from-green-600 to-green-500  hover:shadow-xl hover:scale-105 text-white font-medium py-3 px-8 rounded-md shadow-lg transition duration-300">
                Patient
              </button>
            </NavLink>
          </div>
        </div>
      </section>

      <section id="features" className="container mx-auto py-16 px-6 md:px-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">Our Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Real-Time Queue Updates", icon: <FaHeartbeat />, text: "Keep track of patient queues with live updates, reducing wait times and improving patient flow." },
            { title: "Bed Availability Tracking", icon: <FaBed />, text: "Monitor and manage bed availability efficiently to ensure optimal usage and faster patient admissions." },
            { title: "Online Appointment Scheduling", icon: <FaCalendarAlt />, text: "Allow patients to book appointments easily and receive reminders, enhancing the user experience." }
          ].map((feature, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center hover:scale-105 hover:shadow-xl transition duration-300">
              <div className="text-blue-600 text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 via-blue-600 to-blue-500 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Patient Care?</h2>
          <p className="mb-6">Join CareEase today and experience a revolution in hospital management.</p>
          <NavLink to="/signup">
            <button className="bg-gradient-to-r from-green-600 to-green-500 hover:shadow-xl hover:scale-105 text-white font-medium py-3 px-8 rounded-md shadow-lg transition duration-300">
              Sign Up Now
            </button>
          </NavLink>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-6">
        <div className="text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} CareEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
