import React, { useState } from 'react';

const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const DoctorsTable = ({ doctorsData, onDeleteDoctor }) => {
  const [showDeleteMenu, setShowDeleteMenu] = useState(null); 

  const toggleDeleteMenu = (index) => {
    setShowDeleteMenu(showDeleteMenu === index ? null : index);
  };

  return (
    <div className="w-full p-4 overflow-x-auto bg-white text-black">
      <table className="w-full min-w-[600px] table-auto border-collapse">
        <thead>
          <tr className="text-left text-black uppercase">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Working Days</th>
            <th className="px-4 py-2">Assigned Treatment</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {doctorsData.map((doctor, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td className="px-4 py-2">
                <span className="flex">
                  <img src={doctor.profile || "/icons/Profile_icon.svg"} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                  <span>
                    {doctor.name}<br />
                    <span className="text-gray-500">{doctor.role}</span>
                  </span>
                </span>
              </td>
              <td className="px-4 py-2">{doctor.email}</td>
              <td className="px-4 py-2 flex gap-1">
                {doctor.days.map((isActive, i) => (
                  <span
                    key={i}
                    className={`w-6 h-6 flex items-center justify-center rounded-full text-sm ${
                      isActive ? 'bg-blue-200 text-white' : 'bg-blue-600 text-white'
                    }`}
                    title={isActive ? 'Working' : 'Off'}
                  >
                    {daysOfWeek[i]}
                  </span>
                ))}
              </td>
              <td className="px-4 py-2">{doctor.assignedTreatment}</td>
              <td className="px-4 py-2">
                <button className="px-3 py-1 text-black bg-gray-300 rounded-full">
                  {doctor.type}
                </button>
              </td>
              <td className="relative px-4 py-2">
                {/* Options Button */}
                <button
                  onClick={() => toggleDeleteMenu(index)}
                  className="text-xl text-black focus:outline-none"
                >
                  •••
                </button>
                
                {/* Delete Menu */}
                {showDeleteMenu === index && (
                  <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-300 rounded shadow-lg z-10">
                    <button
                      onClick={() => {
                        onDeleteDoctor(doctor._id, doctor.name);
                        setShowDeleteMenu(null);
                      }}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorsTable;
