import React, { useEffect, useState } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const UserManagement = ({adminInfo}) => {
  const [users, setUsers] = useState([]);

  const dummyData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  ];

    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const response = await fetch(`${BACKEND_URL}/api/admins/admin-profile`);
            if (!response.ok) throw new Error("Server not responding");
            const data = await response.json();

            const allUsers = response.data.filter(user => 
              user.hospital && user.hospital === adminInfo.hospital
            );
            console.log("user data: ", data)
            setUsers(data);
        } catch (error) {
          console.error("Error fetching admin profile:", error);
        }
      };
  
      fetchUserInfo();
    }, [adminInfo]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Name</th>
            <th className="border-b p-2">Email</th>
            <th className="border-b p-2">Role</th>
            <th className="border-b p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="p-2 border-b">{user.name}</td>
                <td className="p-2 border-b">{user.email}</td>
                <td className="p-2 border-b">{user.role}</td>
                <td className="p-2 border-b">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">No users found</td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
};

export default UserManagement;