import React, { useMemo } from 'react';
import { FaStethoscope, FaStar } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { treatments } from './data';


const TreatmentsCard = () => {

    const treatmentRatingsData = useMemo(() => ({
        labels: treatments.map(treatment => treatment.name),
        datasets: [{
            label: 'Treatment Rating',
            data: treatments.map(treatment => treatment.rating),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }],
    }), [treatments]);

    return (
        <motion.div className="p-6 bg-white rounded-lg shadow-lg" whileHover={{ scale: 1.02 }}>
            <h2 className="flex items-center gap-2 text-blue-800 text-xl font-semibold">
                <FaStar size={24} /> Treatments & Ratings
            </h2>
            <ul className="mt-4 space-y-3">
                {treatments.map((treatment, index) => (
                    <li key={index} className="flex justify-between items-center mb-4">
                        <span>{treatment.name}</span>
                        <span className="flex items-center gap-1 ">
                            <FaStar className='text-yellow-500' /> {treatment.rating.toFixed(1)}
                        </span>
                    </li>
                ))}
            </ul>
            <div className="mt-6">
                <Pie data={treatmentRatingsData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
            </div>
        </motion.div>

    )
};

export default TreatmentsCard;
