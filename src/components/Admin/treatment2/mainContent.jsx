import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL ="http://localhost:5000/api/treatments";

const Treatments = () => {
  const [treatments, setTreatments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchTreatments = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/treatments");
      setTreatments(response.data); // Store the fetched treatments in state
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching treatments:", err);
      setError("Failed to load treatments. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  const searchTreatments = async () => {
    setLoading(true);
    try {
      console.log("Searching treatments with query:", searchQuery); 
      const response = await axios.get(
        `http://localhost:5000/api/treatments/search?query=${searchQuery}`
      );
      console.log("Search results:", response.data); 
      setTreatments(response.data);
      setError(null);
    } catch (err) {
      console.error("Error searching treatments:", err);
      setError("Unable to perform search. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a treatment
  const deleteTreatment = async (id) => {
    setLoading(true);
    try {
      console.log("Deleting treatment with ID:", id); // Debugging log
      await axios.delete(`http://localhost:5000/api/treatments/${id}`);
      console.log("Treatment deleted successfully"); // Debugging log
      fetchTreatments(); // Refresh the list after deletion
    } catch (err) {
      console.error("Error deleting treatment:", err);
      setError("Unable to delete treatment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Add a new treatment (modal logic not included for simplicity)
  const addTreatment = async (newTreatment) => {
    setLoading(true);
    try {
      console.log("Adding new treatment:", newTreatment); // Debugging log
      await axios.post("http://localhost:5000/api/treatments", newTreatment);
      console.log("Treatment added successfully"); // Debugging log
      fetchTreatments(); // Refresh the list after adding
    } catch (err) {
      console.error("Error adding treatment:", err);
      setError("Unable to add treatment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch of treatments
  useEffect(() => {
    fetchTreatments();
  }, []);

  if (loading) return <div>Loading treatments...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Treatments</h1>

      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search treatments"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={searchTreatments}>Search</button>
      </div>

      {/* Error Message */}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {/* Loading State */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        // Treatments List
        <ul>
          {treatments.map((treatment) => (
            <li key={treatment._id}>
              <div>
                <strong>{treatment.name}</strong> - {treatment.type} - ${treatment.price}
              </div>
              <button onClick={() => deleteTreatment(treatment._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Treatments;
