import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import Appointments from "./Appointments";
import PrescriptionOrders from "./PrescriptionOrders";
import InsuranceBenefits from "./InsuranceBenefits";

// Dummy data for fallback
const dummyPatientData = {
  name: "Darlene Gibbs",
  email: "darlene_gibbs@gmail.com",
  phone: "(219) 555-0114",
  address: "6391 Elgin St. Celina, Delaware 10299",
  birthday: "1984-07-09",
  profilePic: "https://via.placeholder.com/150",
  credit: "$0.00",
  balance: "$450.00",
};

const PatientProfile = () => {
  const [patientInfo, setPatientInfo] = useState(null); // Main state for patient data
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const handlePrint = () => {
    const contentToPrint = document.getElementById("printableArea");
    const printWindow = window.open("", "", "height=650, width=900");
    printWindow.document.write("<html><head><title>Profile</title>");
    printWindow.document.write(
      "<style>body{font-family: Arial, sans-serif; padding: 20px;} .profile-print{border: 1px solid #ddd; padding: 20px;}</style>"
    );
    printWindow.document.write("</head><body>");
    printWindow.document.write(contentToPrint.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/patient-profile/"); // Replace with the correct endpoint
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        setPatientInfo(data);
      } catch (error) {
        console.error("Error fetching patient profile:", error.message);
        setError(true); // Set error state to true
        setPatientInfo(dummyPatientData); // Fallback to dummy data
        console.log("Using dummy data:", dummyPatientData); // Debugging log
      } finally {
        setLoading(false);
      }
    };

    fetchPatientInfo();
  }, []);

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  // Ensure the dummy data is displayed even when there's an error
  if (error && patientInfo === null) {
    return (
      <div className="text-center py-6 text-red-500">
        Failed to load data. No fallback data available.
      </div>
    );
  }

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
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      {/* Printable Area */}
      <div id="printableArea" className="profile-print">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Profile Card */}
          <ProfileCard isEditing={isEditing} patientInfo={patientInfo || dummyPatientData} />
          {/* Appointments */}
          <Appointments />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          {/* Prescription Orders */}
          <PrescriptionOrders />
          {/* Insurance Benefits */}
          <InsuranceBenefits />
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
