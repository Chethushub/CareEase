import React, { useState, useEffect } from 'react';
import './mainContent.css';
import axios from 'axios';

const Treatment = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [showModal, setShowModal] = useState(false);
  const [activeTreatments, setActiveTreatments] = useState([]);
  const [inactiveTreatments, setInactiveTreatments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: '',
    visitType: 'SINGLE VISIT',
    category: 'active',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL = "http://localhost:5000/api/treatments";

  // Fetch treatments from backend
  const fetchTreatments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL);
      setActiveTreatments(response.data || []);
      setError(null);

      console.log("All Treatment data: ", response.data);

    } catch (err) {
      setError('Failed to load treatments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Add treatment
  const handleSave = async (e) => {
    e.preventDefault();

    const newTreatment = { ...formData, rating: 'No Rating', reviews: '0' };
    try {
      await axios.post(BASE_URL, newTreatment);
      fetchTreatments(); 
      setShowModal(false);
      setFormData({ name: '', price: '', duration: '', visitType: 'SINGLE VISIT', category: 'active' });
    } catch (err) {
      setError('Unable to add treatment. Please try again.');
    }
  };

  // Delete a treatment
  const handleDelete = async (id, category) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      fetchTreatments(); 
    } catch (err) {
      setError('Unable to delete treatment. Please try again.');
    }
  };

  // Move treatment between active and inactive
  const handleMove = async (id, category) => {
    try {
      const newCategory = category === 'active' ? 'inactive' : 'active';
      await axios.put(`${BASE_URL}/move`, { id, category: newCategory });
      fetchTreatments(); 
    } catch (err) {
      setError('Unable to move treatment. Please try again.');
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  const currentTreatments = activeTab === 'active' ? activeTreatments : inactiveTreatments;

  return (
    
    <div className="treatment-container">
      <div className="tab-container">
        <div className="tabs">
          <button className={`tab ${activeTab === 'active' ? 'active' : ''}`} onClick={() => setActiveTab('active')}>Active Treatment</button>
          <button className={`tab ${activeTab === 'inactive' ? 'active' : ''}`} onClick={() => setActiveTab('inactive')}>Inactive Treatment</button>
        </div>
        <button className="add-treatment" onClick={() => setShowModal(true)}>+ Add Treatment</button>
      </div>


      {error && <div className="error">{error}</div>}

      {loading ? <div>Loading treatments...</div> : (
        <table className="treatment-table">
          <thead>
            <tr>
              <th>Treatment Name</th>
              <th>Price</th>
              <th>Estimate Duration</th>
              <th>Type of Visit</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(currentTreatments && Array.isArray(currentTreatments)) ? (
              currentTreatments.map((treatment) => (
                <tr key={treatment._id}>
                  <td>{treatment.name}</td>
                  <td>{treatment.price}</td>
                  <td>{treatment.duration}</td>
                  <td>{treatment.visitType}</td>
                  <td>{treatment.rating}</td>
                  <td>{treatment.reviews}</td>
                  <td>
                    <button 
                      className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                      onClick={() => handleDelete(treatment._id, activeTab)}>Delete
                    </button>

                    <button 
                      className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                      onClick={() => handleMove(treatment._id, activeTab)}>Move
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No treatments available</td>
              </tr>
            )}
          </tbody>

        </table>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowModal(false)}>X</button>
            <form onSubmit={handleSave}>
              <label>Treatment Name</label>
              <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <label>Price</label>
              <input type="number" name="price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
              <label>Duration</label>
              <input type="text" name="duration" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} />
              <label>Visit Type</label>
              <select name="visitType" value={formData.visitType} onChange={(e) => setFormData({ ...formData, visitType: e.target.value })}>
                <option value="SINGLE VISIT">Single Visit</option>
                <option value="MULTIPLE VISIT">Multiple Visit</option>
              </select>
              <label>Category</label>
              <select name="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Treatment;
