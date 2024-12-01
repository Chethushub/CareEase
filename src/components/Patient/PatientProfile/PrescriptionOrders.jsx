import React from 'react';

const PrescriptionOrders = () => {
  const prescriptions = [
    { id: '004495', date: '2021-01-02', type: 'Prescription', status: 'Completed' },
    { id: '004949', date: '2020-02-06', type: 'Prescription', status: 'Completed' },
    { id: '005994', date: '2020-03-07', type: 'Prescription', status: 'Completed' },
    { id: '009955', date: '2020-06-10', type: 'Prescription', status: 'Completed' },
    { id: '009886', date: '2020-07-02', type: 'Prescription', status: 'Completed' },
  ];

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
              <td className="p-2 border-b">{order.date}</td>
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
