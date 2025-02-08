import React, { useState } from "react";

const AdminProfile = () => {
  const [adminDetails, setAdminDetails] = useState({
    name: "User Name",
    email: "admin@example.com",
    phone: "1234567890",
    role: "Admin",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails({ ...adminDetails, [name]: value });
  };

  const handleSave = () => {
    alert("Details saved successfully!");
    // Add your save logic here (e.g., API call).
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg max-w-lg mx-auto mt-10">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Edit Admin Profile</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={adminDetails.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={adminDetails.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Phone</label>
          <input
            type="text"
            name="phone"
            value={adminDetails.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Role</label>
          <input
            type="text"
            name="role"
            value={adminDetails.role}
            disabled
            className="w-full border border-gray-300 rounded-lg p-2 mt-1 bg-gray-100"
          />
        </div>
      </div>
      <button
        onClick={handleSave}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Save Changes
      </button>
    </div>
  );
};

export default AdminProfile;
