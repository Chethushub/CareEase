import React, { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import Appointments from './Appointments';
import PrescriptionOrders from './PrescriptionOrders';
import InsuranceBenefits from './InsuranceBenefits';

const PatientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [patientInfo, setPatientInfo] = useState(null);

  useEffect(() => {
    const fetchPatientProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/patients/1'); // Replace '1' with the correct patient ID
        const data = await response.json();
        setPatientInfo(data);
      } catch (error) {
        console.error('Error fetching patient profile:', error);
      }
    };

    fetchPatientProfile();
  }, []);

  const toggleEditMode = async () => {
    if (isEditing) {
      // Save changes to backend
      try {
        const response = await fetch('http://localhost:5000/api/patients/1', { // Replace '1' with correct ID
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(patientInfo),
        });

        if (!response.ok) {
          throw new Error('Failed to save patient data');
        }

        const updatedPatient = await response.json();
        setPatientInfo(updatedPatient);
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Error saving patient data:', error);
        alert('Failed to save profile. Please try again.');
      }
    }

    setIsEditing((prev) => !prev);
  };

  const handlePrint = () => {
    const contentToPrint = document.getElementById('printableArea');
    const printWindow = window.open('', '', 'height=650, width=900');
    printWindow.document.write('<html><head><title>Profile</title></head><body>');
    printWindow.document.write(contentToPrint.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  if (!patientInfo) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
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

      <div id="printableArea" className="profile-print">
        <div className="grid lg:grid-cols-2 gap-6">
          <ProfileCard isEditing={isEditing} patientInfo={patientInfo} setPatientInfo={setPatientInfo} />
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
