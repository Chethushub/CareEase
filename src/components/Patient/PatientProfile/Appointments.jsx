import React, { useEffect, useState } from 'react';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/appointments');
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);

        // Dummy data in case of error
        const dummyData = [
          { type: 'Consultation', dateTime: '2024-12-18 10:00 AM', status: 'Scheduled' },
          { type: 'Follow-up', dateTime: '2024-12-19 02:00 PM', status: 'Completed' },
          { type: 'Emergency', dateTime: '2024-12-20 08:30 AM', status: 'Cancelled' },
        ];
        setAppointments(dummyData);
      }
    };

    fetchAppointments();
  }, []);

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
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-2 border-b">{appointment.type}</td>
                <td className="p-2 border-b">{appointment.dateTime}</td>
                <td className="p-2 border-b">{appointment.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-2 border-b" colSpan="3" align="center">
                No appointments available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
