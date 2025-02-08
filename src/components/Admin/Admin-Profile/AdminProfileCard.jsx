import React, { useState } from "react";

const AdminProfileCard = ({ isEditing, adminInfo }) => {
  const [editableInfo, setEditableInfo] = useState(adminInfo);

  const handleChange = (field, value) => {
    setEditableInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Administrator Profile</h3>
      
      <div className="flex items-center gap-4 mb-6">
        <img
          src={editableInfo.profilePic}
          alt="Admin Profile"
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
          <p className="text-sm text-gray-500">{editableInfo.role}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <p className="text-gray-800">{editableInfo.role}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          {isEditing ? (
            <input
              type="text"
              value={editableInfo.department}
              onChange={(e) => handleChange("department", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          ) : (
            <p className="text-gray-800">{editableInfo.department}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Permissions</label>
          <div className="mt-1 flex flex-wrap gap-2">
            {editableInfo.permissions.map((permission, index) => (
              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {permission}
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Last Login</label>
          <p className="text-gray-800">
            {new Date(editableInfo.lastLogin).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileCard;