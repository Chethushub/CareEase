import React, { useState } from 'react';
import './Admin-staff.css';
import DoctorsTable from './DoctorsTable';
import AddDoctor from './AddDoctor';

export default function AdminStaffList() {
  const [doctors, setDoctors] = useState([
    { profile: './icons/Profile_icon.svg', name: 'Mohan Das', role: 'Dentist', email: 'abcd@gmail.com', days: [true, true, true, true, true, true, true], assignedTreatment: "Dentist", type: 'Part-Time' },
    { profile: './icons/Profile_icon.svg', name: 'John Doe', role: 'Surgeon', email: 'john@example.com', days: [true, true, false, false, true, true, false], assignedTreatment: "Surgery", type: 'Full-Time' },
    // Additional dummy data if necessary
  ]);

  const [showAddDoctorDrawer, setShowAddDoctorDrawer] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ type: '', assignedTreatment: '' });

  const handleAddDoctor = (newDoctor) => {
    setDoctors([...doctors, newDoctor]);
    setShowAddDoctorDrawer(false);
  };

  // Delete doctor function
  const handleDeleteDoctor = (email) => {
    setDoctors(doctors.filter((doctor) => doctor.email !== email));
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesType = filters.type ? doctor.type === filters.type : true;
    const matchesTreatment = filters.assignedTreatment ? doctor.assignedTreatment === filters.assignedTreatment : true;
    return matchesType && matchesTreatment;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ type: '', assignedTreatment: '' });
  };

  return (
    <div className="admin-staff-list">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <img src="./icons/treatment.svg" alt="Treatment" className="mr-2" />
          <h1 className="text-lg font-bold">Doctors Available: {filteredDoctors.length}</h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-gray-200 text-black rounded-md"
          >
            Filters
          </button>
          <button
            onClick={() => setShowAddDoctorDrawer(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add Doctor
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="filters bg-white p-4 shadow-md rounded-md mb-4">
          <div className="flex gap-4">
            <div>
              <label className="block font-semibold">Type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">All</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Full-Time">Full-Time</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold">Assigned Treatment</label>
              <select
                name="assignedTreatment"
                value={filters.assignedTreatment}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">All</option>
                <option value="Dentist">Dentist</option>
                <option value="Surgery">Surgery</option>
                {/* Add more treatment options as needed */}
              </select>
            </div>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-red-500 text-white rounded-md mt-6"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Pass the delete handler to DoctorsTable */}
      <DoctorsTable doctorsData={filteredDoctors} onDeleteDoctor={handleDeleteDoctor} />

      <div className={`drawer ${showAddDoctorDrawer ? 'open' : ''}`}>
        <div className="drawer-content p-6 bg-white shadow-lg">
          <AddDoctor onAddDoctor={handleAddDoctor} />
          <button
            onClick={() => setShowAddDoctorDrawer(false)}
            className="mt-4 text-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
