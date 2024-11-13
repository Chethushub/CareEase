import React from 'react';
import './mainContent.css';

const Treatment = () => {
  const treatments = [
    { name: 'General Checkup', price: '2500', duration: '1 hour(s)', visitType: 'SINGLE VISIT', rating: 'No Rating', reviews: '0' },
    { name: 'Teeth Whitening', price: '800', duration: '1 hour(s) / treatments', visitType: 'MULTIPLE VISIT', rating: 'No Rating', reviews: '0' },
    { name: 'Tooth Cleaning', price: '750', duration: '1 hour(s)', visitType: 'SINGLE VISIT', rating: '3.8', reviews: '48' },
    { name: 'Tooth Extraction', price: '1000', duration: '2 hour(s)', visitType: 'MULTIPLE VISIT', rating: '4.5', reviews: '110' },
    { name: 'Tooth Fillings', price: '2100', duration: '1.5 hour(s)', visitType: 'SINGLE VISIT', rating: '3.2', reviews: '75' },
    { name: 'Tooth Scaling', price: '140', duration: '1.5 hour(s)', visitType: 'SINGLE VISIT', rating: '4.5', reviews: '186' },
    { name: 'Tooth Braces (Metal)', price: '3500', duration: '1 hour(s) / treatments', visitType: 'MULTIPLE VISIT', rating: '4.5', reviews: '220' },
    { name: 'Veneers', price: '9250', duration: '1.5 hour(s)', visitType: 'SINGLE VISIT', rating: '4.0', reviews: '32' },
    { name: 'Bonding', price: '1900', duration: '1.5 hour(s)', visitType: 'SINGLE VISIT', rating: '4.0', reviews: '4' }
  ];

  return (
    <div className="treatment-container">
      <h1 className="header">Treatments</h1>
      <div className="tab-container">
        <button className="tab active">Active Treatment</button>
        <button className="tab">Inactive Treatment</button>
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
          {treatments.map((treatment, index) => (
            <tr key={index}>
              <td>{treatment.name}</td>
              <td>{treatment.price}</td>
              <td>{treatment.duration}</td>
              <td><span className={treatment.visitType === 'SINGLE VISIT' ? 'badge single' : 'badge multiple'}>{treatment.visitType}</span></td>
              <td>{treatment.rating}</td>
              <td>{treatment.reviews} Review(s)</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-treatment">+ Add Treatment</button>
    </div>
  );
};

export default Treatment;