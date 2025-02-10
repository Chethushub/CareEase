import React, { useState, useEffect } from 'react';
import './Admin-staff.css';
import DoctorsTable from './DoctorsTable';
import AddDoctor from './AddDoctor';

import { useParams } from 'react-router-dom';

import axios from 'axios'

const BACKEND_URL = "http://localhost:5000"

export default function AdminStaffList() {
  const [doctors, setDoctors] = useState(null);  

  const { userId } = useParams();


    useEffect(() => {
      const fetchDoctors = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/doctors`);
          setDoctors(response.data);
          console.log('Doctor details fetched successfully:', response.data);
          console.log('Doctor hospital details: ', response.data.hospital);
          console.log('Doctor hospital', response.data.hospital);
        } catch (error) {
          console.error(error);
        }
      };
      fetchDoctors();
    }, []);

  const [showAddDoctorDrawer, setShowAddDoctorDrawer] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ id:'', type: '', assignedTreatment: '' });

  const handleAddDoctor = async (newDoctor) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/doctors`, newDoctor);
      setDoctors([...doctors, response.data]);
      setShowAddDoctorDrawer(false);
      console.log("Doctor added successfully:", response.data);
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("There was an error adding the doctor. Please try again.");
    }
  };
  


  const handleDeleteDoctor = async (id,name) => {
    console.log(`Deleting doctor: ${id}, ${name}`);

    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      if (!id || !name) {
        console.error("Invalid doctor data:", { id, name });
        return; 
      }
      try {
          console.log(`Doctor with ID ${id} and name ${name} are requesting to deleted.`);
          await axios.delete(`${BACKEND_URL}/api/doctors/${id}`);
          setDoctors(doctors.filter((doctor) => doctor._id !== id)); 
          console.log(`Doctor with ID ${id} and name ${name} deleted.`);
      } catch (error) {
          console.error(`Error deleting doctor with ID ${id}:`, error);
      }
    }
};



  const filteredDoctors = (doctors || []).filter((doctor) => {
    const matchesType = filters.type ? doctor.type === filters.type : true;
    const matchesTreatment = filters.assignedTreatment ? doctor.assignedTreatment === filters.assignedTreatment : true;
    return matchesType && matchesTreatment;
  });

  console.log("filteredDoctors: ", filteredDoctors);

  filteredDoctors.forEach((doctor) => {
    console.log('Hospital details for', doctor.name, ':', doctor.hospital);
    console.log('Hospital name for', doctor.name, ':', doctor.hospital.name);
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
          <img src="/icons/treatment.svg" alt="Treatment" className="mr-2" />
          <h1 className="text-lg text-gray-400 font-bold">Doctors Available: {filteredDoctors.length}</h1>
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
