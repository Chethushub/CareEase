import { useState } from "react";
import Dashboard from "./components/Admin/dashboard/Dashboard";
import Reservation from "./components/Admin/reservations/Reservations"
import PatientDashboard from "./components/Patient/Dashboard";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/admin-reservations' element={<Reservation />}/>


        <Route path='/patient' element={<PatientDashboard />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
