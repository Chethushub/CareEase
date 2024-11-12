import React from 'react';
import { FaStar } from 'react-icons/fa';
import initialData from './data';

const TreatmentRatingsCard = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <h4 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
        <FaStar /> Treatment Ratings
      </h4>
      <ul className="space-y-2 mt-2">
        {initialData.treatments.map(treatment => (
          <li key={treatment.name} className="flex items-center justify-between">
            <span>{treatment.name}</span>
            <span className="flex items-center gap-1">
              <FaStar className="text-yellow-500" /> {treatment.rating.toFixed(1)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TreatmentRatingsCard;
