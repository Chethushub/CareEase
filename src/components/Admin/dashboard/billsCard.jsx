import React, { useMemo, useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { FaRupeeSign } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';

const BACKEND_URL = "http://localhost:5000";

const BillsCard = ({ timeframe, onTimeframeChange }) => {
  const [billData, setBillData] = useState([]);

  useEffect(() => {
    const fetchBillData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/bills`);
        console.log("✅ Fetched bill data from DB:", response.data);
        
        if (!Array.isArray(response.data)) {
          console.warn("⚠️ Unexpected response format. Expected an array, but got:", response.data);
          setBillData([]);
          return;
        }

        setBillData(response.data);
      } catch (err) {
        console.error("❌ Error fetching bill data:", err);
      }
    };

    fetchBillData();
  }, []);

  const sortedBills = useMemo(() => {
    console.log("🔄 Processing bill data for sorting...", billData);
  
    if (!billData.length) {
      console.warn("⚠️ No bill data available!");
      return [];
    }
  
    if (timeframe.bills === 'months') {
      const monthlyBills = Array(12).fill(0).map((_, month) => ({ label: month, amount: 0 }));
  
      billData.forEach(bill => {
        if (!bill.billDate || typeof bill.amount !== 'number') {
          console.warn("⚠️ Skipping invalid bill entry:", bill);
          return;
        }
  
        const month = new Date(bill.billDate).getMonth();
        monthlyBills[month].amount += bill.amount;
      });
  
      console.log("✅ Final Monthly Aggregation:", monthlyBills);
      return monthlyBills;
    }
  
    if (timeframe.bills === 'weeks') {
      const weeklyBills = Array(7).fill(0).map((_, day) => ({ label: day, amount: 0 }));
  
      billData.forEach(bill => {
        if (!bill.billDate || typeof bill.amount !== 'number') {
          console.warn("⚠️ Skipping invalid bill entry:", bill);
          return;
        }
  
        const dayOfWeek = new Date(bill.billDate).getDay(); // 0 (Sun) - 6 (Sat)
        weeklyBills[dayOfWeek].amount += bill.amount;
      });
  
      console.log("✅ Final Weekly Aggregation:", weeklyBills);
      return weeklyBills;
    }
  
    return billData;
  }, [billData, timeframe.bills]);
  
  

  const DisplaybillData = useMemo(() => {
    const chartLabels = timeframe.bills === 'weeks'
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const chartData = {
       labels: chartLabels,
      datasets: [{
        label: 'Bill Amounts (₹)',
        data: sortedBills.map(bill => bill.amount || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };

    console.log("📊 Final Chart Data:", chartData);
    return chartData;
  }, [sortedBills, timeframe.bills]);

  return (
    <motion.div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200" whileHover={{ scale: 1.01 }}>
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
          <FaRupeeSign /> Bills
        </h4>
        <div className="flex space-x-2">
          <button
            onClick={() => onTimeframeChange('bills', 'weeks')}
            className={`px-2 py-1 rounded ${timeframe.bills === 'weeks' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            Weeks
          </button>
          <button
            onClick={() => onTimeframeChange('bills', 'months')}
            className={`px-2 py-1 rounded ${timeframe.bills === 'months' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            Months
          </button>
        </div>
      </div>
      <Bar
        data={DisplaybillData}
        options={{ scales: { x: { title: { display: true, text: 'Timeframe' } }, y: { title: { display: true, text: 'Amount' } } } }}
      />
    </motion.div>
  );
};

export default BillsCard;
