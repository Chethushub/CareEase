import React, { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const InsuranceBenefits = () => {
  const [benefits, setBenefits] = useState([]);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/insurance`);
        const data = await response.json();
        setBenefits(data);
      } catch (error) {
        console.error("Error fetching insurance benefits:", error);
        setBenefits([
          { name: "Health Insurance", payout: "$2000", status: "Active" },
          { name: "Life Insurance", payout: "$10000", status: "Active" },
        ]);
      }
    };

    fetchBenefits();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Insurance Benefits</h2>
      {benefits.map((benefit, index) => (
        <div key={index} className="p-2 border-b">
          {benefit.name} - {benefit.payout} - {benefit.status}
        </div>
      ))}
    </div>
  );
};

export default InsuranceBenefits;
