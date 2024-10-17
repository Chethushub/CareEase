import React from 'react';
import { FaHeartbeat, FaBed, FaCalendarAlt } from 'react-icons/fa';

const Sample = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Welcome to CareEase
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Streamlining patient care and hospital management with innovative solutions.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-md shadow-lg transition duration-300">
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 px-6 md:px-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
          Our Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center transition duration-300 transform hover:scale-105">
            <FaHeartbeat className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Real-Time Queue Updates</h3>
            <p className="text-gray-600">
              Keep track of patient queues with live updates, reducing wait times and improving patient flow.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center transition duration-300 transform hover:scale-105">
            <FaBed className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Bed Availability Tracking</h3>
            <p className="text-gray-600">
              Monitor and manage bed availability efficiently to ensure optimal usage and faster patient admissions.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center transition duration-300 transform hover:scale-105">
            <FaCalendarAlt className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Online Appointment Scheduling</h3>
            <p className="text-gray-600">
              Allow patients to book appointments easily and receive reminders, enhancing the user experience.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Patient Care?
          </h2>
          <p className="mb-6">
            Join CareEase today and experience a revolution in hospital management.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-md shadow-lg transition duration-300">
            Sign Up Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} CareEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Sample;
