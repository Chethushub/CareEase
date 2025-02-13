import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import Appointments from "./Appointments";
import PrescriptionOrders from "./PrescriptionOrders";
import InsuranceBenefits from "./InsuranceBenefits";
import { useParams } from "react-router-dom";
import axios from "axios";




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
  const [patientInfo, setPatientInfo] = useState(dummyPatientData);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { userId } = useParams();
  

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setPatientInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handlePrint = () => {
    window.print();
  };


  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        setLoading(true);
        // const response = await fetch("http://localhost:5000/api/patientProfile/");
        const response = await fetch(`http://localhost:5000/api/patients/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        console.log("PatientInfo: ", data)
        setPatientInfo(data);
        setError(false);
      } catch (error) {
        console.error("Error fetching patient profile:", error.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientInfo();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Patient Profile</h2>
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Print
        </button>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <ProfileCard
          isEditing={isEditing}
          patientInfo={patientInfo}
          onEditChange={handleChange}
        />
        <Appointments patientId={patientInfo._id}/>
      </div>
      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <PrescriptionOrders />
        <InsuranceBenefits />
      </div>
      <div className="mt-6 flex justify-end">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={toggleEditMode}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;
