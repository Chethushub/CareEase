import React, { useState } from "react";

const BedsAvailability = () => {
  const [bedData, setBedData] = useState([
    { id: "B001", department: "Cardiology", status: "green", patient: "John Doe", age: 45, condition: "Stable", lastUpdated: "2023-10-01" },
    { id: "B002", department: "Neurology", status: "red", patient: "Jane Smith", age: 60, condition: "Critical", lastUpdated: "2023-10-02" },
    { id: "B003", department: "Oncology", status: "yellow", patient: "Michael Johnson", age: 50, condition: "Under Observation", lastUpdated: "2023-10-03" },
    { id: "B004", department: "Pediatrics", status: "green", patient: "Emily Brown", age: 8, condition: "Healthy", lastUpdated: "2023-10-04" },
    { id: "B005", department: "Orthopedics", status: "red", patient: "David Wilson", age: 30, condition: "Recovering", lastUpdated: "2023-10-05" },
    { id: "B006", department: "Emergency", status: "yellow", patient: "Sarah White", age: 35, condition: "Critical", lastUpdated: "2023-10-06" },
    { id: "B007", department: "General", status: "green", patient: "Kevin Lee", age: 28, condition: "Stable", lastUpdated: "2023-10-07" },
  ]);

  const [selectedBed, setSelectedBed] = useState(null);
  const [newPatientName, setNewPatientName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newCondition, setNewCondition] = useState("");
  const [newDepartment, setNewDepartment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Save updated details
  const handleSaveDetails = () => {
    const updatedBedData = bedData.map((bed) =>
      bed.id === selectedBed.id
        ? {
            ...bed,
            patient: newPatientName,
            age: newAge,
            condition: newCondition,
            department: newDepartment,
            lastUpdated: new Date().toISOString().split("T")[0], // Today's date
          }
        : bed
    );
    setBedData(updatedBedData);
    setSelectedBed(null); // Close modal
  };

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
                  <td>${bed.id}</td>
                  <td>${bed.department}</td>
                  <td>${bed.status.charAt(0).toUpperCase() + bed.status.slice(1)}</td>
                  <td>${bed.patient} (Age: ${bed.age}, Condition: ${bed.condition})</td>
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

  // Filter table based on search query
  const filteredData = bedData.filter(
    (bed) =>
      bed.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bed.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bed.patient.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <p className="text-xl font-bold text-red-500">120</p>
          <p className="text-gray-500">Occupied Beds</p>
        </div>
        <div className="bg-white p-4 shadow rounded flex flex-col items-center">
          <p className="text-xl font-bold text-green-500">40</p>
          <p className="text-gray-500">Available Beds</p>
        </div>
        <div className="bg-white p-4 shadow rounded flex flex-col items-center">
          <p className="text-xl font-bold">160</p>
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
              <tr key={bed.id} className="border-b">
                <td className="px-4 py-2">{bed.id}</td>
                <td className="px-4 py-2">{bed.department}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${
                      bed.status === "green"
                        ? "bg-green-500"
                        : bed.status === "red"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  ></span>
                </td>
                <td className="px-4 py-2">
                  <div>{bed.patient}</div>
                  <div className="text-sm text-gray-500">
                    Age: {bed.age}, Condition: {bed.condition}
                  </div>
                </td>
                <td className="px-4 py-2">{bed.lastUpdated}</td>
                <td className="px-4 py-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => {
                      setSelectedBed(bed);
                      setNewPatientName(bed.patient);
                      setNewAge(bed.age);
                      setNewCondition(bed.condition);
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
