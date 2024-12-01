import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import Appointments from './Appointments';
import PrescriptionOrders from './PrescriptionOrders';
import InsuranceBenefits from './InsuranceBenefits';

const PatientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const handlePrint = () => {
    const contentToPrint = document.getElementById('printableArea');
    const printWindow = window.open('', '', 'height=650, width=900');
    printWindow.document.write('<html><head><title>Profile</title>');
    printWindow.document.write('<style>body{font-family: Arial, sans-serif; padding: 20px;} .profile-print{border: 1px solid #ddd; padding: 20px;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(contentToPrint.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Buttons */}
      <div className="flex justify-end items-center mb-6">
        <button
          onClick={handlePrint}
          className="text-blue-600 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-md font-medium transition"
        >
          Download PDF
        </button>

        <button
          onClick={toggleEditMode}
          className="text-blue-600 bg-blue-100 hover:bg-blue-200 px-4 py-2 ml-4 rounded-md font-medium transition"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      {/* Printable Area */}
      <div id="printableArea" className="profile-print">
        <div className="grid lg:grid-cols-2 gap-6">
          <ProfileCard isEditing={isEditing} />
          <Appointments />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <PrescriptionOrders />
          <InsuranceBenefits />
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
