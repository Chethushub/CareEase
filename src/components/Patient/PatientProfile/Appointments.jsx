import React, { useEffect, useState } from "react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/appointments");
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointments([
          { type: "Consultation", dateTime: "2024-12-18 10:00 AM", status: "Scheduled" },
          { type: "Follow-up", dateTime: "2024-12-19 02:00 PM", status: "Completed" },
        ]);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Appointments</h2>
      {appointments.length > 0 ? (
        appointments.map((appointment, index) => (
          <div key={index} className="p-2 border-b">
            {appointment.type} - {appointment.dateTime} - {appointment.status}
          </div>
        ))
      ) : (
        <p>No appointments available</p>
      )}
    </div>
  );
};

export default Appointments;
