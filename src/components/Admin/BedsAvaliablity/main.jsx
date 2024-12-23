import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

const Beds = () => {
  const [bedData, setBedData] = useState([]);
  const [active, setActive] = useState(0);
  // const [bedStatus, setBedStatus] = useState("Not Available");

  const openCard = (cardId) => {
    setActive(cardId);
  };

  const closeCard = () => {
    setActive(0);
  };

  useEffect(() => {
    const fetchBedData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/beds`);
        console.log(response.data);
        setBedData(response.data);
      } catch (err) {
        console.error("Error fetching bed data:", err);
      }
    };

    fetchBedData();
  }, []);

  return (
    <div className="bg-white h-screen">
      <div className="p-4 space-x-5">
        <button className="bg-blue-500 text-white rounded-lg px-5">
          Search
        </button>
        <button className="bg-blue-100 text-blue-700 rounded-lg px-5">
          Export CSV
        </button>
        <button className="bg-blue-100 text-blue-700 rounded-lg px-5">
          Export PDF
        </button>
      </div>

      <div className="flex space-x-10">
        <div className="p-4">
          <p className="text-gray-500 font-medium">Occupied Beds</p>
          <p className="font-bold text-4xl">120</p>
          <p className="text-red-900">v 75%</p>
        </div>
        <div className="p-4">
          <p className="text-gray-500 font-medium">Available Beds</p>
          <p className="font-bold text-4xl">40</p>
          <p className="text-green-600">^ 25%</p>
        </div>
        <div className="p-4">
          <p className="text-gray-500 font-medium">Total Beds</p>
          <p className="font-bold text-4xl">160</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <caption className="text-2xl font-semibold mb-4">
            Bed Management Table
          </caption>
          <thead>
            <tr>
              <th className="px-10">Bed ID</th>
              <th className="px-10">Department</th>
              <th className="px-10">Status</th>
              <th className="px-10">Patient</th>
              <th className="px-10">Last Updated</th>
              <th className="px-10">Actions</th>
            </tr>
          </thead>
          <tbody >
            {bedData.map((bed) => (
              <tr key={bed.id} className="mx-2 my-6">
                <td className="px-14">{bed.bedid}</td>
                <td className="px-14">{bed.department}</td>
                <td className="px-14">{bed.status}</td>
                <td className="px-14">
                  <span>{bed.patient?.name}
                  </span>
                  <p className="text-gray-500 text-xs">
                    Age: {bed.patient?.age}, Problem: {bed.patient?.problem},
                  </p>
                </td>
                <td className="px-14">
                  {new Date(bed.lastupdated).toLocaleString()}
                </td>
                <td className="px-14 py-4">
                  <button
                    onClick={() => openCard(1)}
                    className="bg-blue-600 text-white px-4  py-1 rounded-md"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {active === 1 && <Edit />}
      </div>
    </div>
  );
};

export default Beds;
