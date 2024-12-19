import React, { useEffect, useState } from 'react';

const PrescriptionOrders = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/prescriptions');
        const data = await response.json();
        setPrescriptions(data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Prescription Orders</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Order #</th>
            <th className="border-b p-2">Date</th>
            <th className="border-b p-2">Order Type</th>
            <th className="border-b p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((order, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-2 border-b">{order.id}</td>
              <td className="p-2 border-b">{new Date(order.date).toLocaleDateString()}</td>
              <td className="p-2 border-b">{order.type}</td>
              <td className="p-2 border-b">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrescriptionOrders;
