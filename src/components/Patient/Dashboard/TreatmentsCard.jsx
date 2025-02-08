import React, { useMemo, useState, useEffect } from 'react';
import { FaStethoscope, FaStar } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { treatments } from './data';

import axios from 'axios';
const BACKEND_URL = "http://localhost:5000";


const TreatmentsCard = ({patientId}) => {

      const [PatientTreatmentData, setPatientTreatmentData] = useState(null);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const fetchTreatmentData = async () => {
          try {
            const response = await axios.get(`${BACKEND_URL}/api/treatments/`);
            // const patientTreatments = response.data.filter(treatment => 
            //   treatment.patient && treatment.patient._id && treatment.patient._id === patientId
            // );

            const patientTreatments = response.data  
            console.log("Patient TreatmentData", patientTreatments);
    
            setPatientTreatmentData(patientTreatments);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching appointment data:", error);
            setLoading(false);
          }
        };
    
        fetchTreatmentData();
      }, [patientId]);

      const generateColors = (count) => {
        return Array.from({ length: count }, (_, i) => `hsl(${(i * 360 / count)}, 70%, 50%)`);
    };
    
    const treatmentRatingsData = useMemo(() => {
        const treatmentNames = (PatientTreatmentData || []).map(treatment => treatment.name);
        const treatmentRatings = (PatientTreatmentData || []).map(treatment => treatment.rating);
        
        return {
            labels: treatmentNames,
            datasets: [{
                label: 'Treatment Rating',
                data: treatmentRatings,
                backgroundColor: generateColors(treatmentNames.length),
            }],
        };
    }, [PatientTreatmentData]);
    

    return (
        <motion.div className="p-6 bg-white rounded-lg shadow-lg" whileHover={{ scale: 1.02 }}>
            <h2 className="flex items-center gap-2 text-blue-800 text-xl font-semibold">
                <FaStar size={24} /> Treatments & Ratings
            </h2>

            <ul className="mt-4 space-y-3">
                {PatientTreatmentData && PatientTreatmentData.length > 0 ? (
                    PatientTreatmentData.slice(0, 3).map((treatment, index) => (
                        <li key={index} className="flex justify-between items-center mb-4">
                            <span>{treatment.name}</span>
                            <span className="flex items-center gap-1 ">
                                <FaStar className='text-yellow-500' /> {treatment.rating}
                            </span>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No appointments found.</p>
                )}
            </ul>

            <div className="mt-6">
                <Pie data={treatmentRatingsData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
            </div>
        </motion.div>

    )
};

export default TreatmentsCard;
