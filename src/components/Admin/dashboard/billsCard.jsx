import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { FaRupeeSign } from 'react-icons/fa';
import initialData from './data';
import { motion } from 'framer-motion'

const BillsCard = ({ timeframe, onTimeframeChange }) => {
  const sortedBills = useMemo(() => {
    if (timeframe.bills === 'months') {
      return Object.values(initialData.bills.months.reduce((acc, bill) => {
        const month = new Date(bill.date).getMonth();
        acc[month] = acc[month] || { date: bill.date, amount: 0 };
        acc[month].amount += bill.amount;
        return acc;
      }, {}));
    }
    return initialData.bills[timeframe.bills];
  }, [timeframe.bills]);

  const billData = useMemo(() => ({
    labels: timeframe.bills === 'weeks' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Bill Amounts (₹)',
      data: sortedBills.map(bill => bill.amount),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  }), [sortedBills, timeframe.bills]);

  return (
    <motion.div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200" whileHover={{ scale: 1.01 }}>
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
          <FaRupeeSign /> Bills
        </h4>
        <div className="flex space-x-2">
          <button onClick={() => onTimeframeChange('bills', 'weeks')} className={`px-2 py-1 rounded ${timeframe.bills === 'weeks' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>Weeks</button>
          <button onClick={() => onTimeframeChange('bills', 'months')} className={`px-2 py-1 rounded ${timeframe.bills === 'months' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>Months</button>
        </div>
      </div>
      <Bar data={billData} options={{ scales: { x: { title: { display: true, text: 'Timeframe' } }, y: { title: { display: true, text: 'Amount' } } } }} />    
      </motion.div>
  );
};

export default BillsCard;
