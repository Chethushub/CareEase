import React, { useState, useEffect } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

const BACKEND_URL = "http://localhost:5000"

const BedsAvailability = () => {
    const { userId } = useParams();


  const [bedData, setBedData] = useState([
    { bedid: "B001", department: "Cardiology", status: "Not Available", patient: { name: "John Doe", problem: "Heart Condition", age: 45 }, condition: "Stable", lastUpdated: "2023-10-01" },
    { bedid: "B002", department: "Neurology", status: "Not Available", patient: { name: "Jane Smith", problem: "Stroke", age: 60 }, condition: "Critical", lastUpdated: "2023-10-02" },
    { bedid: "B003", department: "Oncology", status: "Not Available", patient: { name: "Michael Johnson", problem: "Cancer", age: 50 }, condition: "Under Observation", lastUpdated: "2023-10-03" },
    { bedid: "B004", department: "Pediatrics", status: "Available", patient: { name: "Emily Brown", problem: "Asthma", age: 8 }, condition: "Healthy", lastUpdated: "2023-10-04" },
    { bedid: "B005", department: "Orthopedics", status: "Not Available", patient: { name: "David Wilson", problem: "Fracture", age: 30 }, condition: "Recovering", lastUpdated: "2023-10-05" },
    { bedid: "B006", department: "Emergency", status: "Not Available", patient: { name: "Sarah White", problem: "Accident", age: 35 }, condition: "Critical", lastUpdated: "2023-10-06" },
    { bedid: "B007", department: "General", status: "Available", patient: { name: "Kevin Lee", problem: "Fever", age: 28 }, condition: "Stable", lastUpdated: "2023-10-07" }
  ]);
  

  const [selectedBed, setSelectedBed] = useState(null);
  const [newPatientName, setNewPatientName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newCondition, setNewCondition] = useState("");
  const [newDepartment, setNewDepartment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Save updated details
  const handleSaveDetails = () => {
    // if(!selectedBed) return;

    const updatedBedData = bedData.map((bed) =>
      bed.bedid === selectedBed.id
        ? {
            ...bed,
            patient: { ...bed.patient, name: newPatientName, age: newAge, problem: newCondition },
            department: newDepartment,
            lastUpdated: new Date().toISOString().split("T")[0], 
          }
        : bed
    );
    setBedData(updatedBedData);
    setSelectedBed(null); 
  };

  

  useEffect(() => {
    const fetchBedData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/beds`);
        console.log("DB data:", response.data);
        setBedData(response.data);
      } catch (err) {
        console.error("Error fetching bed data:", err);
      }
    };

    fetchBedData();
  }, []);

  useEffect(() => {
    console.log("Updated bedData:", bedData);
  }, [bedData]);
  

  // Export table to print
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const printContent = `
      <html>
        <head>
          <title>Beds Availability</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f4f4f4;
              font-weight: bold;
            }
            h1 {
              text-align: center;
            }
          </style>
        </head>
        <body>
          <table>
            <thead>
              <tr>
                <th>Bed ID</th>
                <th>Department</th>
                <th>Status</th>
                <th>Patient</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              ${bedData
                .map(
                  (bed) => `
                <tr>
                  <td>${bed.bedid}</td>
                  <td>${bed.department}</td>
                  <td>${bed.status.charAt(0).toUpperCase() + bed.status.slice(1)}</td>
                  <td>${bed.patient.name} (Age: ${bed.patient.age}, Condition: ${bed.patient.problem})</td>
                  <td>${bed.lastUpdated}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  
  const filteredData = bedData.filter((bed) => {
    console.log(bed)
    console.log(bed.bedid); 


    return (
      bed.bedid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bed.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bed.patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  

  return (
    <div className="p-6">
      {/* Search and Export */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded w-1/3"
        />
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={handlePrint}
        >
          Export PDF
        </button>
      </div>


      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded flex flex-col items-center">
        <p className="text-xl font-bold text-red-500">
            {bedData.filter((bed) => bed.status !== "Available").length}
        </p>          
        <p className="text-gray-500">Occupied Beds</p>
        </div>
        <div className="bg-white p-4 shadow rounded flex flex-col items-center">
          <p className="text-xl font-bold text-green-500">
            {bedData.filter((bed) => bed.status === "Available").length}
          </p>
          <p className="text-gray-500">Available Beds</p>
        </div>
        <div className="bg-white p-4 shadow rounded flex flex-col items-center">
          <p className="text-xl font-bold">
            {bedData.filter((bed) => bed.bedid).length}
          </p>
          <p className="text-gray-500">Total Beds</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Bed ID</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Patient</th>
              <th className="px-4 py-2 text-left">Last Updated</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((bed) => (
              <tr key={bed.bedid} className="border-b">
                <td className="px-4 py-2">{bed.bedid}</td>
                <td className="px-4 py-2">{bed.department}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${
                      bed.status === "Available" ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                </td>
                <td className="px-4 py-2">
                  <div>{bed.patient.name}</div>
                  <div className="text-sm text-gray-500">
                    Age: {bed.patient.age}, Condition: {bed.patient.problem}
                  </div>
                </td>
                <td className="px-4 py-2">{bed.lastUpdated}</td>
                <td className="px-4 py-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => {
                      setSelectedBed(bed);
                      setNewPatientName(bed.patient.name);
                      setNewAge(bed.patient.age);
                      setNewCondition(bed.patient.problem);
                      setNewDepartment(bed.department);
                    }}
                  >
                    Edit Bed Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Details Modal */}
      {selectedBed && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow w-96">
            <h2 className="text-xl font-bold mb-4">Edit Patient Details</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Patient Name</label>
              <input
                type="text"
                value={newPatientName}
                onChange={(e) => setNewPatientName(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Age</label>
              <input
                type="number"
                value={newAge}
                onChange={(e) => setNewAge(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Condition</label>
              <input
                type="text"
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Department</label>
              <input
                type="text"
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setSelectedBed(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleSaveDetails}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BedsAvailability;
