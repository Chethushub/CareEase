import React, { useState } from "react";

const doctorsData = [
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
    name: "Dr Mohan Das",
    specialty: "Dentist",
    experience: "20 years",
    hospital: "City Hospital",
    languages: ["Kannada"],
    availability: "Available Tomorrow",
    address: "14TH Cross Road, 212, Sri Nitturu Srinivasarao Rd, 3rd Block, Bengaluru, 560011",
    qualifications: "MBBS, MS (Ortho)",
  },
  
];
const DetailedDoctorView = ({ doctor, onBack }) => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <button onClick={onBack} className="text-blue-500 mb-4">&larr; Back to Doctors List</button>
    <div className="flex items-start gap-4">
      <div className="w-24 h-24 rounded-full bg-gray-300 flex-shrink-0">
        <img
          src="./icons/profile-placeholder.png"
          alt="Doctor Profile"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div>
        <h3 className="text-2xl font-bold">{doctor.name}</h3>
        <p className="text-gray-500 text-sm">{doctor.specialty} | {doctor.experience} experience</p>
        <p className="text-gray-500 text-sm">{doctor.qualifications}</p>
        <p className="text-gray-500 text-sm">Languages: {doctor.languages.join(", ")}</p>
        <p className="text-gray-500 text-sm">Hospital: {doctor.hospital}</p>
        <p className="text-gray-500 text-sm">Address: {doctor.address}</p>
      </div>
    </div>
    <div className="mt-4">
      <h4 className="text-lg font-semibold">About {doctor.name}</h4>
      <p className="text-gray-500 text-sm mt-2">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry...
      </p>
    </div>
  </div>
);

const PatientAppointmentPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  //for filter
  const [hospitalFilter, setHospitalFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");

  //for applying filters to the doctors data
  const filteredDoctors = doctorsData.filter((doctor) => {
    return (
      (hospitalFilter === "" || doctor.hospital === hospitalFilter) &&
      (availabilityFilter === "" || doctor.availability === availabilityFilter) &&
      (experienceFilter === "" || parseInt(doctor.experience) >= parseInt(experienceFilter)) &&
      (languageFilter === "" || doctor.languages.includes(languageFilter))
    );
  });

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Filters Section */}
      <div className="w-1/5 p-4 bg-white shadow-md">
        {/* Filters Header */}
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

        {/* Availability Filter */}
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

        {/* Experience Filter */}
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

        {/* Language Filter */}
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
        {/* Conditional Rendering: Show Details or List */}
        {selectedDoctor ? (
          <DetailedDoctorView
            doctor={selectedDoctor}
            onBack={() => setSelectedDoctor(null)}
          />
        ) : (
          <>
            {/* Doctors List Header */}
            <h2 className="text-lg font-semibold text-gray-600 mb-4">
              Doctors (Showing {filteredDoctors.length} of {doctorsData.length})
            </h2>

            {/* Doctors List */}
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
          </>
        )}
      </div>
    </div>
  );
};

export default PatientAppointmentPage;
