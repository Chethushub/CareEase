import React from 'react';

const InsuranceBenefits = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Insurance Benefits</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Insurance Benefits</th>
            <th className="border-b p-2">Payout</th>
            <th className="border-b p-2">Date/Time</th>
            <th className="border-b p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-100">
            <td className="p-2 border-b" colSpan="4" align="center">
              No insurance benefits available
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InsuranceBenefits;
