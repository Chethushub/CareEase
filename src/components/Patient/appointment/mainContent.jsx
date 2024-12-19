import React, { useState, useEffect } from "react";

// Dummy data in case of fetch failure
const dummyDoctorsData = [
  {
    name: "Dr Mohan Das",
    specialty: "Dentist",
    experience: "25 years",
    hospital: "Jeeva Hospital",
    languages: ["Kannada", "English"],
    availability: "Available Today",
    address: "14TH Cross Road, 212, Sri Nitturu Srinivasarao Rd, 3rd Block, Bengaluru, 560011",
    qualifications: "MBBS, MS (Ortho)",
  },
  {
    name: "Dr Priya Kumar",
    specialty: "Cardiologist",
    experience: "15 years",
    hospital: "City Hospital",
    languages: ["Kannada", "English"],
    availability: "Available Tomorrow",
    address: "12TH Cross Road, 220, Malleswaram, Bengaluru, 560003",
    qualifications: "MBBS, MD (Cardiology)",
  },
];

const PatientAppointmentPage = () => {
  const [doctorsData, setDoctorsData] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: "",
    time: "",
    reason: "",
  });

  const [hospitalFilter, setHospitalFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");

  // Fetch doctors data
  useEffect(() => {
    const fetchDoctorsData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doctors");
        if (response.ok) {
          const data = await response.json();
          setDoctorsData(data);
        } else {
          throw new Error("Failed to fetch doctor data");
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        // Use dummy data if fetch fails
        setDoctorsData(dummyDoctorsData);
      }
    };

    fetchDoctorsData();
  }, []);

  const filteredDoctors = doctorsData.filter((doctor) => {
    return (
      (hospitalFilter === "" || doctor.hospital === hospitalFilter) &&
      (availabilityFilter === "" || doctor.availability === availabilityFilter) &&
      (experienceFilter === "" || parseInt(doctor.experience) >= parseInt(experienceFilter)) &&
      (languageFilter === "" || doctor.languages.includes(languageFilter))
    );
  });

  const handleBookAppointment = async () => {
    if (!appointmentDetails.date || !appointmentDetails.time || !appointmentDetails.reason) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctor: selectedDoctor.name,
          hospital: selectedDoctor.hospital,
          date: appointmentDetails.date,
          time: appointmentDetails.time,
          reason: appointmentDetails.reason,
        }),
      });

      if (response.ok) {
        alert("Appointment booked successfully!");
        setIsBooking(false);
        setAppointmentDetails({ date: "", time: "", reason: "" });
      } else {
        alert("Failed to book appointment.");
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
        <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
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
        {/* Other Filters */}
        <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
          <span className="text-sm font-medium text-gray-600">Availability</span>
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="text-sm text-gray-700 bg-white border-none"
          >
            <option value="">All</option>
            <option value="Available Today">Available Today</option>
            <option value="Available Tomorrow">Available Tomorrow</option>
          </select>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
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
        <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
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
        {selectedDoctor ? (
          <>
            {/* Doctor Details */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <button onClick={() => setSelectedDoctor(null)} className="text-blue-500 mb-4">
                &larr; Back to Doctors List
              </button>
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 rounded-full bg-gray-300 flex-shrink-0">
                  <img
                    src="./icons/profile-placeholder.png"
                    alt="Doctor Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{selectedDoctor.name}</h3>
                  <p className="text-gray-500 text-sm">
                    {selectedDoctor.specialty} | {selectedDoctor.experience} experience
                  </p>
                  <p className="text-gray-500 text-sm">{selectedDoctor.qualifications}</p>
                  <p className="text-gray-500 text-sm">Languages: {selectedDoctor.languages.join(", ")}</p>
                  <p className="text-gray-500 text-sm">Hospital: {selectedDoctor.hospital}</p>
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
              {filteredDoctors.map((doctor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md cursor-pointer"
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex-shrink-0">
                      <img
                        src="./icons/profile-placeholder.png"
                        alt="Doctor Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{doctor.name}</h3>
                      <p className="text-gray-500 text-sm">
                        {doctor.specialty} | {doctor.experience} exp
                      </p>
                      <p className="text-gray-500 text-sm">{doctor.hospital}</p>
                      <p className="text-gray-500 text-sm">{doctor.languages.join(", ")}</p>
                    </div>
                  </div>
                </div>
              ))}
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
                    onChange={(e) => setAppointmentDetails({ ...appointmentDetails, time: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Reason</label>
                  <textarea
                    value={appointmentDetails.reason}
                    onChange={(e) => setAppointmentDetails({ ...appointmentDetails, reason: e.target.value })}
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
};

export default PatientAppointmentPage;
