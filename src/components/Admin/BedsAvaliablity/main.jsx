// BedsAvailability.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const BedsAvailability = () => {
  const { userId } = useParams();

  // Data and search state
  const [bedData, setBedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Edit modal states
  const [selectedBed, setSelectedBed] = useState(null);
  const [editPatientName, setEditPatientName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editProblem, setEditProblem] = useState("");
  const [editDepartment, setEditDepartment] = useState("");
  const [editStatus, setEditStatus] = useState("");

  // Add modal states
  const [showAddBedModal, setShowAddBedModal] = useState(false);
  const [newBedId, setNewBedId] = useState("");
  const [newBedDepartment, setNewBedDepartment] = useState("");
  const [newBedStatus, setNewBedStatus] = useState("Not Available");
  const [newBedPatientName, setNewBedPatientName] = useState("");
  const [newBedPatientAge, setNewBedPatientAge] = useState("");
  const [newBedPatientProblem, setNewBedPatientProblem] = useState("");

  // Fetch bed data from backend
  useEffect(() => {
    const fetchBedData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/beds`);
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

  // Handle updating an existing bed
  const handleSaveDetails = async () => {
    if (!selectedBed) return;

    const updatedBed = {
      department: editDepartment,
      patient: {
        name: editPatientName,
        age: Number(editAge),
        problem: editProblem,
      },
      status: editStatus,
    };

    try {
      const response = await axios.patch(
        `${BACKEND_URL}/api/beds/${selectedBed._id}`,
        updatedBed
      );
      setBedData((prevData) =>
        prevData.map((bed) =>
          bed._id === selectedBed._id ? response.data : bed
        )
      );
      setSelectedBed(null);
    } catch (err) {
      console.error("Error updating bed details:", err);
    }
  };

  // Handle adding a new bed
  const handleAddBed = async (e) => {
    e.preventDefault();
    const newBed = {
      bedid: newBedId,
      department: newBedDepartment,
      status: newBedStatus,
      patient: {
        name: newBedPatientName,
        age: newBedPatientAge ? Number(newBedPatientAge) : 0,
        problem: newBedPatientProblem,
      },
      lastupdated: new Date(),
    };

    try {
      const response = await axios.post(`${BACKEND_URL}/api/beds`, newBed);
      setBedData([...bedData, response.data]);
      setShowAddBedModal(false);
      // Reset add bed form fields
      setNewBedId("");
      setNewBedDepartment("");
      setNewBedStatus("Not Available");
      setNewBedPatientName("");
      setNewBedPatientAge("");
      setNewBedPatientProblem("");
    } catch (err) {
      console.error("Error adding new bed:", err);
    }
  };

  // Filter bed data based on search query
  const filteredData = bedData.filter((bed) => {
    return (
      bed.bedid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bed.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bed.patient &&
        typeof bed.patient === "object" &&
        bed.patient.name &&
        bed.patient.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  // Print function (simulate PDF export)
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
                  <td>${
                    bed.status.trim().toLowerCase().charAt(0).toUpperCase() +
                    bed.status.trim().toLowerCase().slice(1)
                  }</td>
                  <td>${
                    (bed.patient &&
                      typeof bed.patient === "object" &&
                      bed.patient.name) ||
                    "No patient"
                  } (Age: ${
      (bed.patient &&
        typeof bed.patient === "object" &&
        bed.patient.age) ||
      "N/A"
    }, Condition: ${
      (bed.patient &&
        typeof bed.patient === "object" &&
        bed.patient.problem) ||
      "N/A"
    })</td>
                  <td>${new Date(bed.lastupdated).toLocaleDateString()}</td>
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

  // Summary stats calculations
  const occupiedCount = bedData.filter(
    (bed) => bed.status.trim().toLowerCase() === "occupied"
  ).length;
  const availableCount = bedData.filter(
    (bed) => bed.status.trim().toLowerCase() === "available"
  ).length;
  const underMaintenanceCount = bedData.filter(
    (bed) => bed.status.trim().toLowerCase() === "under maintenance"
  ).length;
  const reservedCount = bedData.filter(
    (bed) => bed.status.trim().toLowerCase() === "reserved"
  ).length;

  return (
    <div className="p-6">
      {/* Search, Export and Add Bed Button */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded w-1/3"
        />
        <div>
          <button
            className="px-4 py-2 bg-gray-200 rounded mr-2"
            onClick={handlePrint}
          >
            Export PDF
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => setShowAddBedModal(true)}
          >
            Add Bed
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded flex flex-col items-center">
          <p className="text-xl font-bold text-red-500">{occupiedCount}</p>
          <p className="text-gray-500">Occupied Beds</p>
        </div>
        <div className="bg-white p-4 shadow rounded flex flex-col items-center">
          <p className="text-xl font-bold text-green-500">{availableCount}</p>
          <p className="text-gray-500">Available Beds</p>
        </div>
        <div className="bg-white p-4 shadow rounded flex flex-col items-center">
          <p className="text-xl font-bold text-yellow-500">
            {underMaintenanceCount}
          </p>
          <p className="text-gray-500">Under Maintenance Beds</p>
        </div>
        <div className="bg-white p-4 shadow rounded flex flex-col items-center">
          <p className="text-xl font-bold text-blue-500">{reservedCount}</p>
          <p className="text-gray-500">Reserved Beds</p>
        </div>
        <div className="bg-white p-4 shadow rounded flex flex-col items-center">
          <p className="text-xl font-bold">{bedData.length}</p>
          <p className="text-gray-500">Total Beds</p>
        </div>
      </div>

      {/* Beds Table */}
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
              <tr key={bed._id} className="border-b">
                <td className="px-4 py-2">{bed.bedid}</td>
                <td className="px-4 py-2">{bed.department}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${
                      bed.status.trim().toLowerCase() === "available"
                        ? "bg-green-500"
                        : bed.status.trim().toLowerCase() === "occupied"
                        ? "bg-red-500"
                        : bed.status.trim().toLowerCase() === "under maintenance"
                        ? "bg-yellow-500"
                        : bed.status.trim().toLowerCase() === "reserved"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    }`}
                  ></span>
                </td>
                <td className="px-4 py-2">
                  {bed.patient &&
                  typeof bed.patient === "object" &&
                  bed.patient.name ? (
                    <>
                      <div>{bed.patient.name}</div>
                      <div className="text-sm text-gray-500">
                        Age: {bed.patient.age || "N/A"}, Condition:{" "}
                        {bed.patient.problem || "N/A"}
                      </div>
                    </>
                  ) : (
                    <div>No patient assigned</div>
                  )}
                </td>
                <td className="px-4 py-2">
                  {new Date(bed.lastupdated).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => {
                      setSelectedBed(bed);
                      // Prepopulate edit modal fields
                      const patient =
                        typeof bed.patient === "object" && bed.patient !== null
                          ? bed.patient
                          : { name: "", age: "", problem: "" };
                      setEditPatientName(patient.name || "");
                      setEditAge(patient.age || "");
                      setEditProblem(patient.problem || "");
                      setEditDepartment(bed.department);
                      setEditStatus(bed.status.trim());
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

      {/* Edit Bed Modal */}
      {selectedBed && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow w-96">
            <h2 className="text-xl font-bold mb-4">Edit Bed Details</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Patient Name</label>
              <input
                type="text"
                value={editPatientName}
                onChange={(e) => setEditPatientName(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Age</label>
              <input
                type="number"
                value={editAge}
                onChange={(e) => setEditAge(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Condition</label>
              <input
                type="text"
                value={editProblem}
                onChange={(e) => setEditProblem(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Department</label>
              <input
                type="text"
                value={editDepartment}
                onChange={(e) => setEditDepartment(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Status</label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="Occupied">Occupied</option>
                <option value="Available">Available</option>
                <option value="Under Maintenance">Under Maintenance</option>
                <option value="Reserved">Reserved</option>
                <option value="Not Available">Not Available</option>
              </select>
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

      {/* Add Bed Modal */}
      {showAddBedModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow w-96">
            <h2 className="text-xl font-bold mb-4">Add New Bed</h2>
            <form onSubmit={handleAddBed}>
              <div className="mb-4">
                <label className="block text-gray-700">Bed ID</label>
                <input
                  type="text"
                  value={newBedId}
                  onChange={(e) => setNewBedId(e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Department</label>
                <input
                  type="text"
                  value={newBedDepartment}
                  onChange={(e) => setNewBedDepartment(e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <select
                  value={newBedStatus}
                  onChange={(e) => setNewBedStatus(e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                  <option value="Occupied">Occupied</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                  <option value="Reserved">Reserved</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Patient Name (optional)</label>
                <input
                  type="text"
                  value={newBedPatientName}
                  onChange={(e) => setNewBedPatientName(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Patient Age (optional)</label>
                <input
                  type="number"
                  value={newBedPatientAge}
                  onChange={(e) => setNewBedPatientAge(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Patient Condition (optional)</label>
                <input
                  type="text"
                  value={newBedPatientProblem}
                  onChange={(e) => setNewBedPatientProblem(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded"
                  onClick={() => setShowAddBedModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
                  Add Bed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BedsAvailability;
