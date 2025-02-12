import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

const PatientAppointmentPage = () => {
  const { userId } = useParams();

  console.log(userId + " userid")

  if (!userId) {
    console.log("hi, entered")
    return (
      <div className="col-span-full my-4 text-center text-lg text-gray-600">
        We couldn't find your information. Please try again later or contact support if the issue persists.
      </div>
    );
  }

  console.log("Contining ... bcz userid not null")

  const [doctorsData, setDoctorsData] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [isBooking, setIsBooking] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: "",
    time: "",
    problem: "",
  });

  const [hospitalFilter, setHospitalFilter] = useState("");
  const [availableDaysFilter, setavailabileDaysFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("");




  // Fetch doctors data
  useEffect(() => {
    const fetchDoctorsData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doctors");
        if (response.ok) {
          const data = await response.json();
          setDoctorsData(data);

          console.log("DoctorsData: ", data)
          
        } else {
          throw new Error("Failed to fetch doctor data");
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctorsData();
  }, [userId]);

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  


  const filteredDoctors = doctorsData.filter((doctor) => {
    return (
      (hospitalFilter === "" || doctor.hospital.name === hospitalFilter) &&
      (availableDaysFilter === "" || doctor.days[daysOfWeek.indexOf(availableDaysFilter)]) &&
      (experienceFilter === "" || parseInt(doctor.experience) >= parseInt(experienceFilter)) &&
      (languageFilter === "" || doctor.language.includes(languageFilter))
    );
  });
  
  const formatTime = (time) => {
    console.log("formatTime function running")
    if (!time) return "";
    let [hours, minutes] = time.split(":");
    let period = +hours >= 12 ? "PM" : "AM";
    hours = +hours % 12 || 12; 
    console.log("formatTime retuen by formatTime function: ", `${hours}:${minutes} ${period}`)

    return `${hours}:${minutes} ${period}`;
  };

  const handleBookAppointment = async () => {
    if (!appointmentDetails.date || !appointmentDetails.time || !appointmentDetails.problem) {
      alert("Please fill out all fields.");
      return;
    }
  
    const patientId = userId; 
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(patientId);
  
    if (!isValidObjectId) {
      alert("Invalid patient ID.");
      console.error("Patient ID is not a valid ObjectId:", patientId);
      return;
    }

    const formatedTime = formatTime(appointmentDetails.time);
  
    const requestBody = {
      patient: patientId,
      doctor: selectedDoctor._id,
      hospital: selectedDoctor.hospital._id,
      date: appointmentDetails.date,
      time: formatedTime,
      problem: appointmentDetails.problem,
      status: "registered",
    };
  
    console.log("Request Payload:", JSON.stringify(requestBody));
  
    try {
      const response = await fetch("http://localhost:5000/api/appointments/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        alert("Appointment booked successfully!");
        setIsBooking(false);
        setAppointmentDetails({ date: "", time: "", problem: "" });
      } else {
        const errorData = await response.json();
        console.error("Server Response Error:", errorData);
        alert(`Failed to book appointment: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("An error occurred while booking the appointment.");
    }
  };
  


  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Filters Section */}
      <div className="w-1/5 p-4 bg-white shadow-md">
        <div className="text-lg font-bold mb-4">Filters</div>
        {/* Hospital Filter */}
        <div className="flex justify-between items-center p-3 my-2 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium text-gray-600">Hospital</span>
          <select
            value={hospitalFilter}
            onChange={(e) => setHospitalFilter(e.target.value)}
            className="text-sm text-gray-700 bg-white border-none"
          >
            <option value="">All Hospitals</option>
            <option value="Jeeva Hospital">Jeeva Hospital</option>
            <option value="City Hospital">City Hospital</option>
          </select>
        </div>

        <div className="flex justify-between items-center p-3 my-2 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium text-gray-600">Availability</span>
          <select
            value={availableDaysFilter}
            onChange={(e) => setavailabileDaysFilter(e.target.value)}
            className="text-sm text-gray-700 bg-white border-none"
          >
            <option value="">Any</option>
            {daysOfWeek.map((day, index) => (
              <option key={index} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center p-3 my-2 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium text-gray-600">Available Time</span>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="text-sm text-gray-700 bg-white border-none"
          >
            <option value="">Any Time</option>
            {[...new Set(doctorsData.flatMap((doctor) => doctor.availableTimes))].map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center p-3 my-2 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium text-gray-600">Experience</span>
          <select
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
            className="text-sm text-gray-700 bg-white border-none"
          >
            <option value="">Any Experience</option>
            <option value="5">5+ years</option>
            <option value="10">10+ years</option>
            <option value="20">20+ years</option>
          </select>
        </div>
        <div className="flex justify-between items-center p-3 my-2 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium text-gray-600">Language</span>
          <select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="text-sm text-gray-700 bg-white border-none"
          >
            <option value="">All Languages</option>
            <option value="Kannada">Kannada</option>
            <option value="English">English</option>
          </select>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="w-4/5 p-6">
        {doctorsData.length === 0 ? (
          <div className="text-center text-gray-600 text-xl">
            No doctors available at the moment.
          </div>
        ) : selectedDoctor ? (
          <>
            {/* Doctor Details */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <button onClick={() => setSelectedDoctor(null)} className="text-blue-500 mb-4">
                &larr; Back to Doctors List
              </button>
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 rounded-full bg-gray-300 flex-shrink-0">
                  <img
                    src={selectedDoctor.profile ? selectedDoctor.profile : "/images/doctor_img.png"}
                    alt="Doctor Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-2xl text-blue-800 font-bold">{selectedDoctor.name}</h3>
                  <p className="text-gray-500 text-sm">
                    {selectedDoctor.specialization} | {selectedDoctor.experience} experience
                  </p>
                  <p className="text-gray-500 text-sm">{selectedDoctor.qualifications}</p>
                  <p className="text-gray-500 text-sm">Languages: {selectedDoctor.language.join(", ")}</p>
                  <p className="text-gray-500 text-sm">Hospital: {selectedDoctor.hospital.name}</p>
                  <p className="text-gray-500 text-sm">Address: {selectedDoctor.address}</p>
                </div>
              </div>
              <button
                onClick={() => setIsBooking(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg mt-4"
              >
                Book Appointment
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-gray-600 mb-4">
              Doctors (Showing {filteredDoctors.length} of {doctorsData.length})
            </h2>

            <div className="grid gap-4">
            {filteredDoctors.length === 0 ? (
                <div className="col-span-full text-center text-lg text-gray-600">No doctors found based on your filters.</div>
              ) : (
                filteredDoctors.map((doctor, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md cursor-pointer"
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gray-300 flex-shrink-0">
                        <img
                          src={doctor.profile ? doctor.profile : "/images/doctor_img.png"}
                          alt="Doctor Profile"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg text-blue-800 font-bold">{doctor.name}</h3>
                        <p className="text-gray-500 text-sm">
                          {doctor.specialization} | {doctor.experience} exp
                        </p>
                        <p className="text-gray-500 text-sm">{doctor.hospital.name}</p>
                        <p className="text-gray-500 text-sm">{doctor.language.join(", ")}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            
            </div>
          </>
        )}

        {/* Booking Modal */}
        {isBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Book Appointment with {selectedDoctor.name}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    value={appointmentDetails.date}
                    onChange={(e) => setAppointmentDetails({ ...appointmentDetails, date: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <input
                    type="time"
                    value={appointmentDetails.time}
                    onChange={(e) => {
                      setAppointmentDetails({ ...appointmentDetails, time: e.target.value });
                    }}                    
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Reason</label>
                  <textarea
                    value={appointmentDetails.problem}
                    onChange={(e) => setAppointmentDetails({ ...appointmentDetails, problem: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  ></textarea>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-4">
                <button
                  onClick={() => setIsBooking(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBookAppointment}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}


export default PatientAppointmentPage;
