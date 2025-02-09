import React, { useEffect, useState } from "react";

const Appointments = ({patientId}) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/appointments");
        const data = await response.json(); 

        console.log("appoint data: ", data); 
  
        const patientAppointments = data.filter(
          (appointment) =>
            appointment.patient &&
            appointment.patient._id &&
            appointment.patient._id === patientId
        );

        console.log("patientAppointments data: ", patientAppointments); 
        setAppointments(patientAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
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
