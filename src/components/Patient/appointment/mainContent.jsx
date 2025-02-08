import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

const dummyDoctorsData = [
  { name: "Dr. Mohan Das", specialty: "Dentist", experience: "25 years", hospital: "Jeeva Hospital", languages: ["Kannada", "English"], availabileTimes: ["2:00 PM","3:00 PM","4:00 PM"] ,  days: [false,true,true,true,false,true,true], address: "14TH Cross Road, Bengaluru, 560011", qualifications: "MBBS, MS (Ortho)", profile: "./images/doctor_img.png" },
  { name: "Dr. Priya Kumar", specialty: "Cardiologist", experience: "15 years", hospital: "City Hospital", languages: ["Kannada", "English"], availabileTimes: ["12:00 PM","1:00 PM","2:00 PM"],  days: [false,true,true,true,false,true,true], address: "Malleswaram, Bengaluru, 560003", qualifications: "MBBS, MD (Cardiology)", profile: "data:image/jpeg;base64,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" },
  { name: "Dr. Arjun Reddy", specialty: "Orthopedic", experience: "12 years", hospital: "Sparsh Hospital", languages: ["Telugu", "English"], availabileTimes: ["2:00 PM","3:00 PM","4:00 PM"] ,  days: [false,true,true,true,false,true,true], address: "Koramangala, Bengaluru, 560034", qualifications: "MBBS, MS (Ortho)", profile: "data:image/jpeg;base64,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" },
  { name: "Dr. Kavita Sharma", specialty: "Gynecologist", experience: "18 years", hospital: "Motherhood Hospital", languages: ["Hindi", "English"], availabileTimes: ["2:00 PM","3:00 PM","4:00 PM"] ,  days: [false,true,true,true,false,true,true], address: "Whitefield, Bengaluru, 560066", qualifications: "MBBS, MD (Gynecology)", profile: "./images/doctor_img.png" },
  { name: "Dr. Amit Patel", specialty: "Pediatrician", experience: "10 years", hospital: "Rainbow Hospital", languages: ["Gujarati", "English"], availabileTimes: ["12:00 PM","1:00 PM","2:00 PM"],  days: [false,true,true,true,false,true,true], address: "Jayanagar, Bengaluru, 560041", qualifications: "MBBS, MD (Pediatrics)", profile: "./images/doctor_img.png" },
  { name: "Dr. Ritu Singh", specialty: "Dermatologist", experience: "14 years", hospital: "SkinCare Clinic", languages: ["Punjabi", "English"], availabileTimes: ["2:00 PM","3:00 PM","4:00 PM"] ,  days: [false,true,true,true,false,true,true], address: "MG Road, Bengaluru, 560001", qualifications: "MBBS, MD (Dermatology)", profile: "./images/doctor_img.png" },
  { name: "Dr. Vikas Nair", specialty: "ENT Specialist", experience: "8 years", hospital: "Apollo Hospital", languages: ["Malayalam", "English"], availabileTimes: ["12:00 PM","1:00 PM","2:00 PM"],  days: [false,true,true,true,false,true,true], address: "Bannerghatta Road, Bengaluru, 560076", qualifications: "MBBS, MS (ENT)", profile: "./images/doctor_img.png" },
  { name: "Dr. Sneha Joshi", specialty: "Neurologist", experience: "20 years", hospital: "NIMHANS", languages: ["Marathi", "English"], availabileTimes: ["2:00 PM","3:00 PM","4:00 PM"] ,  days: [false,true,true,true,false,true,true], address: "Hosur Road, Bengaluru, 560029", qualifications: "MBBS, DM (Neurology)", profile: "./images/doctor_img.png" },
  { name: "Dr. Rajeev Menon", specialty: "Oncologist", experience: "22 years", hospital: "HCG Cancer Center", languages: ["Malayalam", "English"], availabileTimes: ["2:00 PM","3:00 PM","4:00 PM"] ,  days: [false,true,true,true,false,true,true], address: "KR Road, Bengaluru, 560004", qualifications: "MBBS, DM (Oncology)", profile: "./images/doctor_img.png" },
  { name: "Dr. Neha Gupta", specialty: "Psychiatrist", experience: "10 years", hospital: "Fortis Hospital", languages: ["Hindi", "English"], availabileTimes: ["12:00 PM","1:00 PM","2:00 PM"],  days: [false,true,true,true,false,true,true], address: "Richmond Town, Bengaluru, 560025", qualifications: "MBBS, MD (Psychiatry)", profile: "./images/doctor_img.png" },
  { name: "Dr. Ramesh Yadav", specialty: "General Physician", experience: "12 years", hospital: "Columbia Asia", languages: ["Hindi", "English"], availabileTimes: ["2:00 PM","3:00 PM","4:00 PM"] ,  days: [false,true,true,true,false,true,true], address: "Yeshwanthpur, Bengaluru, 560022", qualifications: "MBBS", profile: "./images/doctor_img.png" },
  { name: "Dr. Anjali Roy", specialty: "Ophthalmologist", experience: "15 years", hospital: "Narayana Nethralaya", languages: ["Bengali", "English"], availabileTimes: ["12:00 PM","1:00 PM","2:00 PM"],  days: [false,true,true,true,false,true,true], address: "Rajajinagar, Bengaluru, 560010", qualifications: "MBBS, MS (Ophthalmology)", profile: "./images/doctor_img.png" },
  { name: "Dr. Manish Aggarwal", specialty: "Dentist", experience: "10 years", hospital: "Cosmetic Dental Clinic", languages: ["Hindi", "English"], availabileTimes: ["2:00 PM","3:00 PM","4:00 PM"] ,  days: [false,true,true,true,false,true,true], address: "Indiranagar, Bengaluru, 560038", qualifications: "BDS, MDS", profile: "./images/doctor_img.png" },
  { name: "Dr. Shruthi Iyer", specialty: "Gynecologist", experience: "18 years", hospital: "Cloudnine Hospital", languages: ["Tamil", "English"], availabileTimes: ["2:00 PM","3:00 PM","4:00 PM"] ,  days: [false,true,true,true,false,true,true], address: "JP Nagar, Bengaluru, 560078", qualifications: "MBBS, MD (Gynecology)", profile: "./images/doctor_img.png" },
  { name: "Dr. Harish Bhat", specialty: "Orthopedic", experience: "22 years", hospital: "Manipal Hospital", languages: ["Kannada", "English"], availabileTimes: ["12:00 PM","1:00 PM","2:00 PM"],  days: [false,true,true,true,false,true,true], address: "Old Airport Road, Bengaluru, 560017", qualifications: "MBBS, MS (Ortho)", profile: "./images/doctor_img.png" },
  { name: "Dr. Pooja Mishra", specialty: "Dermatologist", experience: "14 years", hospital: "DermaSkin Clinic", languages: ["Hindi", "English"], availabileTimes: ["2:00 PM","3:00 PM","4:00 PM"] ,  days: [false,true,true,true,false,true,true], address: "Koramangala, Bengaluru, 560034", qualifications: "MBBS, MD (Dermatology)", profile: "./images/doctor_img.png" },
  { name: "Dr. Arvind Srinivas", specialty: "Cardiologist", experience: "30 years", hospital: "Jayadeva Hospital", languages: ["Kannada", "English"], availabileTimes: ["2:00 PM","3:00 PM","4:00 PM"] ,  days: [false,true,true,true,false,true,true], address: "Bannerghatta Road, Bengaluru, 560076", qualifications: "MBBS, DM (Cardiology)", profile: "./images/doctor_img.png" },
  { name: "Dr. Meera Rajan", specialty: "Neurologist", experience: "25 years", hospital: "Sakra World Hospital", languages: ["Tamil", "English"], availabileTimes: ["12:00 PM","1:00 PM","2:00 PM"],  days: [false,true,true,true,false,true,true], address: "Marathahalli, Bengaluru, 560037", qualifications: "MBBS, DM (Neurology)", profile: "./images/doctor_img.png" },
  { name: "Dr. Sanjay Kapoor", specialty: "Oncologist", experience: "20 years", hospital: "HCG Hospital", languages: ["Punjabi", "English"], availabileTimes: ["2:00 PM","3:00 PM","4:00 PM"] ,  days: [false,true,true,true,false,true,true], address: "Basavanagudi, Bengaluru, 560004", qualifications: "MBBS, DM (Oncology)", profile: "./images/doctor_img.png" },
];



const PatientAppointmentPage = () => {
  const { userId } = useParams();

  console.log(userId + " userid")

  if (!userId) {
    console.log("hi, enterd")
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
    reason: "",
  });

  const [hospitalFilter, setHospitalFilter] = useState("");
  const [availabileDaysDFilter, setavailabileDaysFilter] = useState("");
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

          
        } else {
          throw new Error("Failed to fetch doctor data");
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctorsData();
  }, []);

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  


  const filteredDoctors = doctorsData.filter((doctor) => {
    return (
      (hospitalFilter === "" || doctor.hospital === hospitalFilter) &&
      (availabileDaysDFilter === "" || doctor.days[daysOfWeek.indexOf(availabileDaysDFilter)]) &&
      (experienceFilter === "" || parseInt(doctor.experience) >= parseInt(experienceFilter)) &&
      (languageFilter === "" || doctor.languages.includes(languageFilter))
    );
  });
  
  

  const handleBookAppointment = async () => {
    if (!appointmentDetails.date || !appointmentDetails.time || !appointmentDetails.reason) {
      alert("Please fill out all fields.");
      return;
    }
  
    const patientId = "67510191bc8d53a71136999d"; 
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(patientId);
  
    if (!isValidObjectId) {
      alert("Invalid patient ID.");
      console.error("Patient ID is not a valid ObjectId:", patientId);
      return;
    }
  
    const requestBody = {
      patient: patientId,
      doctor: selectedDoctor.name,
      hospital: selectedDoctor.hospital,
      date: appointmentDetails.date,
      time: appointmentDetails.time,
      reason: appointmentDetails.reason,
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
        setAppointmentDetails({ date: "", time: "", reason: "" });
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
            value={availabileDaysDFilter}
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
            {[...new Set(doctorsData.flatMap((doctor) => doctor.availabileTimes))].map((time, index) => (
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
                    src={selectedDoctor.profile ? selectedDoctor.profile : "./images/doctor_img.png"}
                    alt="Doctor Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-2xl text-blue-800 font-bold">{selectedDoctor.name}</h3>
                  <p className="text-gray-500 text-sm">
                    {selectedDoctor.specialty} | {selectedDoctor.experience} experience
                  </p>
                  <p className="text-gray-500 text-sm">{selectedDoctor.qualifications}</p>
                  {/* <p className="text-gray-500 text-sm">Languages: {selectedDoctor.languages.join(", ")}</p> */}
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
                          src={doctor.profile ? doctor.profile : "./images/doctor_img.png"}
                          alt="Doctor Profile"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg text-blue-800 font-bold">{doctor.name}</h3>
                        <p className="text-gray-500 text-sm">
                          {doctor.specialty} | {doctor.experience} exp
                        </p>
                        <p className="text-gray-500 text-sm">{doctor.hospital}</p>
                        {/* <p className="text-gray-500 text-sm">{doctor.languages.join(", ")}</p> */}
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
}


export default PatientAppointmentPage;
