import React, { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const PrescriptionOrders = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/prescriptions`);
        const data = await response.json();
        setPrescriptions(data);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
        setPrescriptions([
          { id: "1234", date: "2024-12-15", type: "Refill", status: "Shipped" },
          { id: "5678", date: "2024-12-10", type: "New", status: "Processing" },
        ]);
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Prescription Orders</h2>
      {prescriptions.length > 0 ? (
        prescriptions.map((order, index) => (
          <div key={index} className="p-2 border-b">
            {order.id} - {order.date} - {order.status}
          </div>
        ))
      ) : (
        <p>No prescription orders available</p>
      )}
    </div>
  );
};

export default PrescriptionOrders;
