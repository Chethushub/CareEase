import React, {useState, useEffect} from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000"

const Header = ({ title, patientId }) => {
  const [patientName, setPatientName] = useState("");

  useEffect(() => {
    if (patientId) {
      const fetchPatientData = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/patients/${patientId}`);
            setPatientName(response.data.name);
        } catch (error) {
          console.error("Error fetching patient data:", error);
        }
      };
  
      fetchPatientData();
    }
  }, [patientId]);

  return (
    <div className="flex justify-between items-center p-2 bg-white shadow-md border-b border-gray-200">

      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold md:font-bold text-gray-800 mx-2 cursor-pointer">{title}</h2>

      <div className="relative w-52 sm:w-50 lg:w-96 mr-4 ml-4">
        <img
          src="./icons/search.svg"
          alt="Search Icon"
          className="absolute left-3 top-1/2 mr-4 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search"
          className="!w-full h-10 !pl-10 pr-3 !rounded-full border  bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition !text-gray-800 !border-gray-300"
        />
      </div>
      <div className="flex items-center gap-4">


        <div className="flex items-center gap-2 md:gap-2 lg:gap-4">
          <img
            src="./icons/Icons.svg"
            alt="Icons"
            className="w-6 h-6 hover:scale-110 transform transition duration-200 cursor-pointer"
          />

          <NavLink
            to={`/patient-profile/${patientId}`}
            className="text-gray-800 font-semibold flex items-center cursor-pointer hover:font-bold rounded-lg px-3   hover:bg-gray-200"
          >
            <div className="flex items-center gap-1 md:gap-1 lg:gap-3 pl-3 border-l border-gray-300 cursor-pointer hover:bg-gray-100 rounded-lg p-1 transition duration-200">
              <img src="./icons/Profile_icon.svg" alt="Profile" className="w-8 h-8 rounded-full" />
              <div className="text-left">
                <span className="block font-medium text-sm md:text-sm lg:text-base text-gray-900">{patientName}</span>
                <span className="block text-xs text-gray-500">Patient</span>
              </div>
              <img src="./icons/down_arrow.svg" alt="Down Arrow" className="w-4 h-4" />
            </div>
          </NavLink>



        </div>
      </div>
    </div>
  );
};

export default Header;
