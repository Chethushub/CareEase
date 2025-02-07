import React, { useMemo, useState, useEffect } from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import { bills } from './data';

import axios from 'axios';  

const BACKEND_URL = "http://localhost:5000";

const BillsCard = ({patientId}) => {
  const billChartData = useMemo(() => ({
    labels: bills.map(bill => bill.date),
    datasets: [{
      label: 'Bill Amounts (₹)',
      data: bills.map(bill => bill.amount),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  }), []);

    const [PatientBillData, setPatientBillData] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchBillData = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/bills/`);
          const patientBills = response.data.filter(bills => bills.patient._id === patientId);
          console.log("Patient Bill Data", patientBills);
  
          setPatientBillData(patientBills);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching bill data:", error);
          setLoading(false);
        }
      };
  
      fetchBillData();
    }, [patientId]); 

  return (
    <motion.div className="p-6 bg-white rounded-lg shadow-lg" whileHover={{ scale: 1.02 }}>
      <h2 className="flex items-center gap-2 text-blue-800 text-xl font-semibold">
        <FaRupeeSign size={24} /> Bills & Payments
      </h2>
      <ul className="mt-4">
        {bills.slice(0, 2).map((bill, index) => (
          <li key={index} className="mb-4 border-b pb-2">
            <p><strong>Doctor:</strong> {bill.doctorName}</p>
            <p><strong>Amount:</strong> ₹ {bill.amount}</p>
            <p><strong>Date:</strong> {bill.date}</p>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Bar data={billChartData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { x: { title: { display: true, text: 'Timeframe' } }, y: { title: { display: true, text: 'Amount' } } } }} />
      </div>
    </motion.div>
  );
};

export default BillsCard;
