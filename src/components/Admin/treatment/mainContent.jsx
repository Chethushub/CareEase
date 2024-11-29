import React, { useState } from 'react';
import './mainContent.css';

const Treatment = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [showModal, setShowModal] = useState(false);


  const [activeTreatments, setActiveTreatments] = useState([
    { name: 'General Checkup', price: '2500', duration: '1 hour(s)', visitType: 'SINGLE VISIT', rating: 'No Rating', reviews: '0' },
    { name: 'Teeth Whitening', price: '800', duration: '1 hour(s) / treatments', visitType: 'MULTIPLE VISIT', rating: 'No Rating', reviews: '0' },
  ]);

  const [inactiveTreatments, setInactiveTreatments] = useState([
    { name: 'Veneers', price: '9250', duration: '1.5 hour(s)', visitType: 'SINGLE VISIT', rating: '4.0', reviews: '32' },
    { name: 'Bonding', price: '1900', duration: '1.5 hour(s)', visitType: 'SINGLE VISIT', rating: '4.0', reviews: '4' },
  ]);


  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: '',
    visitType: 'SINGLE VISIT',
    category: 'active',
  });


  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };


  const handleAddTreatment = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSave = (e) => {
    e.preventDefault();

    const newTreatment = {
      ...formData,
      rating: 'No Rating',
      reviews: '0',
    };

    if (formData.category === 'active') {
      setActiveTreatments([...activeTreatments, newTreatment]);
    } else {
      setInactiveTreatments([...inactiveTreatments, newTreatment]);
    }


    setShowModal(false);
    setFormData({
      name: '',
      price: '',
      duration: '',
      visitType: 'SINGLE VISIT',
      category: 'active',
    });
  };

  const handleMove = (index, tab) => {
    if (tab === 'active') {
      const movedTreatment = activeTreatments.splice(index, 1)[0];
      setActiveTreatments([...activeTreatments]);
      setInactiveTreatments([...inactiveTreatments, movedTreatment]);
    } else {
      const movedTreatment = inactiveTreatments.splice(index, 1)[0];
      setInactiveTreatments([...inactiveTreatments]);
      setActiveTreatments([...activeTreatments, movedTreatment]);
    }
  };



  const handleDelete = (index, category) => {
    if (category === 'active') {
      const updatedActiveTreatments = [...activeTreatments];
      updatedActiveTreatments.splice(index, 1);
      setActiveTreatments(updatedActiveTreatments);
    } else {
      const updatedInactiveTreatments = [...inactiveTreatments];
      updatedInactiveTreatments.splice(index, 1);
      setInactiveTreatments(updatedInactiveTreatments);
    }
  };

  const currentTreatments = activeTab === 'active' ? activeTreatments : inactiveTreatments;

  return (
    <div className="treatment-container">
      <div className="tab-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('active')}
          >
            Active Treatment
          </button>
          <button
            className={`tab ${activeTab === 'inactive' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('inactive')}
          >
            Inactive Treatment
          </button>
        </div>
        <button className="add-treatment" onClick={handleAddTreatment}>
          + Add Treatment
        </button>
      </div>
      <table className="treatment-table">
        <thead>
          <tr>
            <th>Treatment Name</th>
            <th>Price</th>
            <th>Estimate Duration</th>
            <th>Type of Visit</th>
            <th>Rating</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {currentTreatments.map((treatment, index) => (
            <tr key={index}>
              <td className="flex justify-between items-center">
                {treatment.name}
                <div className="flex gap-2">
                  <button
                    className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                    onClick={() => handleDelete(index, activeTab)}
                  >
                    Delete
                  </button>
                  <button
                    className="ml-2 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                    onClick={() => handleMove(index, activeTab)}
                  >
                    Move
                  </button>
                </div>
              </td>
              <td>{treatment.price}</td>
              <td>{treatment.duration}</td>
              <td>
                <span
                  className={treatment.visitType === 'SINGLE VISIT' ? 'badge single' : 'badge multiple'}
                >
                  {treatment.visitType}
                </span>
              </td>
              <td>{treatment.rating}</td>
              <td>{treatment.reviews} Review(s)</td>
            </tr>
          ))}
        </tbody>

      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className='form-header'>
              <h2 className="text-xl font-bold mb-4">Add Treatment</h2>
              <button className="close-button bg-red-500 bg-opacity-70 hover:bg-red-500 text-white px-4 py-2 rounded" onClick={handleCloseModal}>
                X
              </button>
              </div>
            <form className="space-y-4" onSubmit={handleSave}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Treatment Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter treatment name"
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="Enter duration"
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type of Visit</label>
                <select
                  name="visitType"
                  value={formData.visitType}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-500"
                  required
                >
                  <option value="SINGLE VISIT">Single Visit</option>
                  <option value="MULTIPLE VISIT">Multiple Visit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-500"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Treatment;
