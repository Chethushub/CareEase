import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { FaCalendarAlt, FaHeart, FaRupeeSign, FaCircle, FaStar, FaFileMedical, FaUserMd, FaChartLine } from 'react-icons/fa';
import 'chart.js/auto';

const Dashboard = () => {
  const [schedules] = useState([
    { id: 1, doctor: 'Dr. Smith', time: '10:00 AM', location: 'Jai hospital, 4th cross, Indiranagar' },
    { id: 2, doctor: 'Dr. Jones', time: '1:00 PM', location: 'Room 101, Victory hospital, Bengaluru' },
  ]);

  const [healthTips] = useState([
    'Drink plenty of water to stay hydrated.',
    'Aim for 7-9 hours of sleep each night for optimal health.',
    'Exercise regularly to maintain your physical and mental well-being.',
    'Eat a balanced diet with a focus on fresh vegetables and fruits.',
  ]);

  const [bills] = useState([
    { doctorName: 'John Doe', amount: 200, date: '2024-11-01' },
    { doctorName: 'Jane Smith', amount: 150, date: '2024-11-13' },
    { doctorName: 'John Doe', amount: 320, date: '2024-12-01' },
    { doctorName: 'John Doe', amount: 120, date: '2024-11-01' },
  ]);

  const [treatments] = useState([
    { name: 'Scaling & Polishing', rating: 4.7 },
    { name: 'Tooth Extraction', rating: 4.4 },
    { name: 'General Checkup', rating: 4.6 },
  ]);

  const [medicalRecords] = useState([
    { date: '2024-10-01', description: 'Annual Checkup' },
    { date: '2024-07-12', description: 'Blood Test' },
  ]);

  const billChartData = useMemo(() => ({
    labels: bills.map(bill => bill.date),
    datasets: [{
      label: 'Bill Amounts (₹)',
      data: bills.map(bill => bill.amount),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  }), [bills]);

  const treatmentRatingsData = useMemo(() => ({
    labels: treatments.map(treatment => treatment.name),
    datasets: [{
      label: 'Treatment Rating',
      data: treatments.map(treatment => treatment.rating),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    }],
  }), [treatments]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Good Morning, Rohan!</h1>
        <p className="text-lg font-semibold text-gray-600">Today is Tuesday, 12-Nov-2024</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Schedules Card */}
        <motion.div className="p-6 bg-white rounded-lg shadow-lg" whileHover={{ scale: 1.02 }}>
          <h2 className="flex items-center gap-2 text-blue-800 text-xl font-semibold">
            <FaCalendarAlt size={24} /> My Schedules
          </h2>
          <ul className="mt-4">
            {schedules.map(schedule => (
              <li key={schedule.id} className="mb-4 border-b pb-2">
                <p><strong>Doctor:</strong> {schedule.doctor}</p>
                <p><strong>Time:</strong> {schedule.time}</p>
                <p><strong>Location:</strong> {schedule.location}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Health Tips Card */}
        <motion.div className="p-6 bg-white rounded-lg shadow-lg" whileHover={{ scale: 1.02 }}>
          <h2 className="flex items-center gap-2 text-blue-800 text-xl font-semibold">
            <FaHeart size={24} /> Health Tips
          </h2>
          <ul className="mt-4 space-y-3">
            {healthTips.map((tip, index) => (
              <li key={index} className="text-gray-700 flex items-center">
                <FaCircle size={8} className="mr-2 text-blue-200" /> {tip}
              </li>
            ))}
          </ul>

        </motion.div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 gap-6">
        {/* Bills Card */}
        <motion.div className="p-6 bg-white rounded-lg shadow-lg" whileHover={{ scale: 1.02 }}>
          <h2 className="flex items-center gap-2 text-blue-800 text-xl font-semibold">
            <FaRupeeSign size={24} /> Bills & Payments
          </h2>
          <ul className="mt-4">
            {bills.map((bill, index) => {
              if (index < 2) {
                return (
                  <li key={index} className="mb-4 border-b pb-2">
                    <p><strong>Doctor:</strong> {bill.doctorName}</p>
                    <p><strong>Amount:</strong> ₹ {bill.amount}</p>
                    <p><strong>Date:</strong> {bill.date}</p>
                  </li>
                );
              }
              return null; 
            })}
          </ul>

          <div className="mt-6">
            <Bar data={billChartData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { x: { title: { display: true, text: 'Timeframe' } }, y: { title: { display: true, text: 'Amount' } } } } } />
          </div>
        </motion.div>


        <div className="grid grid-row-1 lg:grid-rows-2 gap-6">
          {/* Medical Records Card */}
          <motion.div className="p-6 bg-white rounded-lg shadow-lg" whileHover={{ scale: 1.02 }}>
            <h2 className="flex items-center gap-2 text-blue-800 text-xl font-semibold">
              <FaFileMedical size={24} /> Medical Records
            </h2>
            <ul className="mt-4 space-y-3">
              {medicalRecords.map((record, index) => (
                <li key={index} className="mb-4 border-b pb-2">
                  <p><strong>Date:</strong> {record.date}</p>
                  <p><strong>Description:</strong> {record.description}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Health Stats */}
          <motion.div className="p-6 bg-white rounded-lg shadow-lg" whileHover={{ scale: 1.02 }}>
            <h2 className="flex items-center gap-2 text-blue-800 text-xl font-semibold">
              <FaChartLine size={24} /> Health Stats
            </h2>
            <div className="mt-6">
              <Line
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                  datasets: [{
                    label: 'Weight (kg)',
                    data: [71, 72, 70, 69, 68, 68],
                    fill: false,
                    borderColor: '#42A5F5',
                    tension: 0.1,
                  }],
                }}
                options={{
                  responsive: true,
                  scales: {
                    x: { grid: { display: false } },
                    y: { beginAtZero: true },
                  },
                  plugins: { legend: { display: false } },
                  scales: { x: { title: { display: true, text: 'Timeframe' } }, y: { title: { display: true, text: 'Weight (Kg)' } } }
                }}
                
        
              />
            </div>
          </motion.div>
        </div>



        {/* Treatments Card */}
        <motion.div className="p-6 bg-white rounded-lg shadow-lg" whileHover={{ scale: 1.02 }}>
          <h2 className="flex items-center gap-2 text-blue-800 text-xl font-semibold">
            <FaStar size={24} /> Treatments & Ratings
          </h2>
          <ul className="mt-4 space-y-3">
            {treatments.map((treatment, index) => (
              <li key={index} className="flex justify-between items-center mb-4">
                <span>{treatment.name}</span>
                <span className="flex items-center gap-1 ">
                  <FaStar className='text-yellow-500' /> {treatment.rating.toFixed(1)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Pie data={treatmentRatingsData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
