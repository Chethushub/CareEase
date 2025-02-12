import React, { useState, useEffect } from "react";
import axios from "axios";
import "./mainContent.css";

const BASE_URL = "http://localhost:5000/api/treatments";
import { useParams } from "react-router-dom";

const BACKEND_URL = "http://localhost:5000"

const Treatments = () => {
  const { userId } = useParams();
  
  const [treatments, setTreatments] = useState([]);
  const [filteredTreatments, setFilteredTreatments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", price: "", duration: "", type: "", rating: "", reviews: "", category: "active" });


        const [admin, setAdmin] = useState([]);
        
        useEffect(() => {
          const fetchAdmin = async () => {
            try {
              console.log("userId: ", userId);
              const response = await axios.get(`${BACKEND_URL}/api/admins/${userId}`);
              setAdmin(response.data);
              console.log('Admin details fetched successfully:', response.data);
            } catch (error) {
              console.error(`Failed to fetch admin details for userId ${userId}:`, error);
            }
          };
          fetchAdmin();
        }, [userId]);
    
         useEffect(() => {
            if (admin && admin.hospital) {
              const AdminHospitalId = admin.hospital._id;
              console.log("AdminHospitalId: ", AdminHospitalId);
          
              const fetchTreatments = async () => {
                try {
                  const response = await axios.get(`${BACKEND_URL}/api/treatments`);
  
                  const sortTreatments = response.data.filter(treatment => treatment.hospital._id === AdminHospitalId);
                  setTreatments(sortTreatments);
                  setFilteredTreatments(sortTreatments);
                  console.log('Doctor details fetched successfully:', sortTreatments);
                } catch (error) {
                  console.error(error);
                }
              };
  
              fetchTreatments();
            }
          }, [admin]);  


  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredTreatments(treatments);
    } else {
      setFilteredTreatments(
        treatments.filter((treatment) =>
          treatment.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, treatments]);

  const deleteTreatment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this treatment?")) return;
    setLoading(true);
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      setTreatments((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete treatment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;
    setLoading(true);
    try {
      const updatedData = {
        ...formData,
        price: Number(formData.price),
        rating: Number(formData.rating),
        reviews: Number(formData.reviews),
      };

      const { data } = await axios.post(BASE_URL, updatedData);
      setTreatments((prev) => [...prev, data]);

      setShowModal(false);
      setFormData({ name: "", price: "", duration: "", type: "", rating: "", reviews: "", category: "active" });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save treatment. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="treatment-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search treatments"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => setSearchQuery("")} className="clear-btn mx-2">Clear</button>
        <button onClick={() => setShowModal(true)} className="add-treatment-btn">+ Add Treatment</button>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="treatment-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Type</th>
              <th>Rating</th>
              <th>Reviews</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTreatments.map((treatment) => (
              <tr key={treatment._id}>
                <td>{treatment.name}</td>
                <td>${treatment.price}</td>
                <td>{treatment.duration}</td>
                <td>{treatment.type}</td>
                <td>{treatment.rating}</td>
                <td>{treatment.reviews}</td>
                <td className="action-buttons">
                  <button className="delete-btn" onClick={() => deleteTreatment(treatment._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Treatment</h2>
            <form onSubmit={handleFormSubmit}>
              <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Treatment Name" required />
              <input type="number" name="price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="Price" required />
              <input type="text" name="duration" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="Duration" required />
              <input type="text" name="type" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} placeholder="Type" required />
              <input type="number" name="rating" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} placeholder="Rating" required />
              <input type="number" name="reviews" value={formData.reviews} onChange={(e) => setFormData({ ...formData, reviews: e.target.value })} placeholder="Reviews" required />
              <button className="save-btn mx-1" type="submit">Save</button>
              <button className="cancel-btn mx-1" onClick={() => setShowModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Treatments;
