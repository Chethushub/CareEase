// DoctorsTable.js
import React from 'react';

const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const DoctorsTable = ({ doctorsData }) => {
  return (
    <div className="w-full p-4 overflow-x-auto bg-white text-black">
      <table className="w-full min-w-[600px] table-auto border-collapse">
        <thead>
          <tr className="text-left text-gray-400 uppercase">
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
                  <img src={doctor.profile} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
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
                      isActive ? 'bg-gray-300 text-black' : 'bg-gray-700 text-gray-500'
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
              <td className="px-4 py-2">
                <button className="text-xl text-white">•••</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorsTable;
