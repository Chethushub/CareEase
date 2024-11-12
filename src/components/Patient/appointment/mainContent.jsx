// PatientAppointmentPage.js
import React from "react";

const doctorsData = [
  {
    name: "Dr Mohan Das",
    specialty: "Dentist",
    experience: "25 years",
    hospital: "Jeeva Hospital",
    languages: ["Kannada", "English"],
    availability: "Available Today",
  },
  {
    name: "Dr Mohan Das",
    specialty: "Dentist",
    experience: "25 years",
    hospital: "Jeeva Hospital",
    languages: ["Kannada", "English"],
    availability: "Available Tomorrow",
  },
  // Additional doctor data as needed
];

const PatientAppointmentPage = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Filters Section */}
      <div className="w-1/5 p-4 bg-white shadow-md">
         {/* Filters Header */}
         <div className="text-lg font-bold mb-4">Filters</div>

{/* Filter Categories */}
<div className="mb-4">
  <div className="text-sm font-semibold text-gray-600 uppercase mb-2">Categories</div>
  <div className="flex items-center gap-2 text-gray-700">
    <img src="./icons/left-arrow.svg" alt="left arrow" className="w-4" />
    <span>Doctors</span>
  </div>
</div>

{/* Filter Options */}
<div className="space-y-2">
  {/* Individual Filter Boxes */}
  <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
    <span className="text-sm font-medium text-gray-600">Hospital</span>
    <img src="./icons/down_arrow.svg" alt="down arrow" className="w-4" />
  </div>
  <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
    <span className="text-sm font-medium text-gray-600">Availability</span>
    <img src="./icons/down_arrow.svg" alt="down arrow" className="w-4" />
  </div>
  <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
    <span className="text-sm font-medium text-gray-600">Fees</span>
    <img src="./icons/down_arrow.svg" alt="down arrow" className="w-4" />
  </div>
  <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
    <span className="text-sm font-medium text-gray-600">Experience</span>
    <img src="./icons/down_arrow.svg" alt="down arrow" className="w-4" />
  </div>
  <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
    <span className="text-sm font-medium text-gray-600">Gender</span>
    <img src="./icons/down_arrow.svg" alt="down arrow" className="w-4" />
  </div>
  <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
    <span className="text-sm font-medium text-gray-600">Language</span>
    <img src="./icons/down_arrow.svg" alt="down arrow" className="w-4" />
  </div>
  <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
    <span className="text-sm font-medium text-gray-600">Sort By</span>
    <img src="./icons/down_arrow.svg" alt="down arrow" className="w-4" />
  </div>
</div>
      </div>

      {/* Main Content Section */}
      <div className="w-4/5 p-6">
        {/* Search Bar */}
        <div className="mb-6 relative">
          <img
            src="./icons/search.svg"
            alt="Search icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search doctors, hospital"
            className="w-full pl-12 p-3 rounded-full border border-gray-300 shadow-sm text-gray-700"
          />
        </div>

        {/* Doctors List Header */}
        <h2 className="text-lg font-semibold text-gray-600 mb-4">
          Doctors (Showing 1 – 6 of 105)
        </h2>

        {/* Doctors List */}
        <div className="grid gap-4">
          {doctorsData.map((doctor, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md"
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
                  <p className="text-gray-500 text-sm">
                    {doctor.languages.join(", ")}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="flex items-center gap-1 text-sm text-black mb-2">
                  <span className="w-2 h-2 bg-black rounded-full inline-block"></span>
                  {doctor.availability}
                </p>
                <button className="px-4 py-2 bg-[#F4F4F4] text-black rounded-lg shadow-sm">
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientAppointmentPage;
