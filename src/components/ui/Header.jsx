import React, {useState, useEffect} from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000"

const Header = ({ title, adminId }) => {
  const navigate = useNavigate(); 
  const [adminName, setAdminName] = useState("");

  const handleProfileClick = () => {
    navigate("/admin-profile"); 
  };

  console.log("Admin id in header: ", adminId)
  console.log("Title in header: ", title)

    useEffect(() => {
      if (adminId) {
        const fetchAdminData = async () => {
          try {
            const response = await axios.get(`${BACKEND_URL}/api/admins/${adminId}`);
              setAdminName(response.data.name);
              console.log(response.data.name)
              console.log(response.data)
          } catch (error) {
            console.error("Error fetching patient data:", error);
          }
        };
    
        fetchAdminData();
      }
    }, [adminId]);

  return (
    <div className="flex justify-between items-center p-2 bg-white shadow-md border-b border-gray-200">
      {/* Title */}
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold md:font-bold text-gray-800 m-2 cursor-pointer">
        {title}
      </h2>

      {/* Search Bar */}
      <div className="relative w-52 sm:w-50 lg:w-96 mr-4 ml-4">
        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold md:font-bold text-gray-400 mx-2 cursor-pointer">Appointment Management</h3>

        {/* <img
          src="/icons/search.svg"
          alt="Search Icon"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search"
          className="w-full h-10 pl-10 pr-3 rounded-full border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-800 border-gray-300"
        /> */}
      </div>

      {/* Icons and Profile Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 md:gap-2 lg:gap-4">
          {/* <img
            src="/icons/help.svg"
            alt="Help Icon"
            className="w-6 h-6 hover:scale-110 transform transition duration-200 cursor-pointer hidden lg:block"
          />
          <img
            src="/icons/Icons.svg"
            alt="Icons"
            className="w-6 h-6 hover:scale-110 transform transition duration-200 cursor-pointer"
          />
          <img
            src="/icons/settingGreyColor.svg"
            alt="Settings"
            className="w-6 h-6 text-gray-400 hover:scale-110 transform transition duration-200 cursor-pointer hidden md:block"
          /> */}

          {/* Profile Section */}
          <NavLink
            to={`/admin-profile/${adminId}`}
            className="text-gray-800 font-semibold flex items-center cursor-pointer hover:font-bold rounded-lg px-3 hover:bg-gray-200"
          >
            <div className="flex items-center gap-1 lg:gap-3 pl-3 border-l border-gray-300 cursor-pointer hover:bg-gray-100 rounded-lg p-1 transition duration-200">
              <img
                src="/icons/Profile_icon.svg"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <div className="text-left">
                <span className="block font-medium text-sm lg:text-base text-gray-900">
                  {adminName}
                </span>
                <span className="block text-xs text-gray-500">Admin</span>
              </div>
              <img
                src="/icons/down_arrow.svg"
                alt="Down Arrow"
                className="w-4 h-4"
              />
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
