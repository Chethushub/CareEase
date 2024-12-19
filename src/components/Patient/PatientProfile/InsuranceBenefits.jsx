import React, { useEffect, useState } from 'react';

const InsuranceBenefits = () => {
  const [benefits, setBenefits] = useState([]);
  const [hasBenefits, setHasBenefits] = useState(false);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/insurance');
        const data = await response.json();
        setBenefits(data);
        setHasBenefits(data.length > 0);
      } catch (error) {
        console.error('Error fetching insurance benefits:', error);
      }
    };

    fetchBenefits();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Insurance Benefits</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Insurance Benefit</th>
            <th className="border-b p-2">Payout</th>
            <th className="border-b p-2">Date/Time</th>
            <th className="border-b p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {hasBenefits ? (
            benefits.map((benefit, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-2 border-b">{benefit.name}</td>
                <td className="p-2 border-b">{benefit.payout}</td>
                <td className="p-2 border-b">
                  {new Date(benefit.date).toLocaleDateString()}
                </td>
                <td className="p-2 border-b">{benefit.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-2 border-b" colSpan="4" align="center">
                No insurance benefits available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InsuranceBenefits;
