import React, { useState } from "react";

const ProfileCard = ({ isEditing, patientInfo }) => {
  const [editableInfo, setEditableInfo] = useState(patientInfo);

  const handleChange = (field, value) => {
    setEditableInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">General Information</h3>
      
      {/* Profile Picture and Name */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={editableInfo.profilePic}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          {isEditing ? (
            <input
              type="text"
              value={editableInfo.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="block w-full font-bold text-lg text-gray-800 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md shadow-sm"
            />
          ) : (
            <p className="text-xl font-bold text-gray-800">{editableInfo.name}</p>
          )}
          <p className="text-sm text-gray-500">Patient</p>
        </div>
      </div>

      {/* Credit and Balance */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-100 p-3 rounded-md">
          <p className="text-sm text-gray-600">Credit</p>
          <p className="text-lg font-bold text-gray-800">{editableInfo.credit}</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-md">
          <p className="text-sm text-gray-600">Balance</p>
          <p className="text-lg font-bold text-gray-800">{editableInfo.balance}</p>
        </div>
      </div>

      {/* Other Details */}
      <div className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          {isEditing ? (
            <input
              type="email"
              value={editableInfo.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          ) : (
            <p className="text-gray-800">{editableInfo.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          {isEditing ? (
            <input
              type="text"
              value={editableInfo.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          ) : (
            <p className="text-gray-800">{editableInfo.phone}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          {isEditing ? (
            <input
              type="text"
              value={editableInfo.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          ) : (
            <p className="text-gray-800">{editableInfo.address}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
