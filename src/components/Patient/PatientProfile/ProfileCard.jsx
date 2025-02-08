import React from "react";

const ProfileCard = ({ isEditing, patientInfo, onEditChange }) => {
  const handleInputChange = (field, event) => {
    onEditChange(field, event.target.value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">General Information</h3>
      <div className="flex items-center gap-4 mb-6">
        <img
          src={patientInfo.profilePic}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          {isEditing ? (
            <input
              type="text"
              value={patientInfo.name}
              onChange={(e) => handleInputChange("name", e)}
              className="text-xl font-bold text-gray-800 mb-2 border-b border-gray-300"
            />
          ) : (
            <p className="text-xl font-bold text-gray-800">{patientInfo.name}</p>
          )}
          <p className="text-sm text-gray-500">Patient</p>
        </div>
      </div>
      <div>
        {isEditing ? (
          <>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={patientInfo.email}
              onChange={(e) => handleInputChange("email", e)}
              className="w-full mb-2 p-2 border-b border-gray-300"
            />
            <label className="block mb-2">Phone</label>
            <input
              type="text"
              value={patientInfo.phone}
              onChange={(e) => handleInputChange("phone", e)}
              className="w-full mb-2 p-2 border-b border-gray-300"
            />
            <label className="block mb-2">Address</label>
            <input
              type="text"
              value={patientInfo.address}
              onChange={(e) => handleInputChange("address", e)}
              className="w-full mb-2 p-2 border-b border-gray-300"
            />
          </>
        ) : (
          <>
            <p>Email: {patientInfo.email}</p>
            <p>Phone: {patientInfo.phone}</p>
            <p>Address: {patientInfo.address}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
