import React from 'react';

const Appointments = () => {
  const appointments = [
    { type: 'Therapist', dateTime: '2021-05-20/13:00', status: 'Scheduled' },
    { type: 'Dentist', dateTime: '2021-05-17/10:45', status: 'Scheduled' },
    { type: 'Antibody Assay', dateTime: '2021-05-10/09:00', status: 'Confirmed' },
    { type: 'Bacterial Seeding', dateTime: '2021-05-09/15:15', status: 'Confirmed' },
    { type: 'Dentist', dateTime: '2021-04-28/11:10', status: 'Confirmed' },
    { type: 'Therapist', dateTime: '2021-04-22/14:20', status: 'Confirmed' },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Appointment Information</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Type</th>
            <th className="border-b p-2">Date/Time</th>
            <th className="border-b p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-2 border-b">{appointment.type}</td>
              <td className="p-2 border-b">{appointment.dateTime}</td>
              <td className="p-2 border-b">{appointment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
