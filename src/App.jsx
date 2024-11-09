import react from "react";
import Landing from "./components/Landing"

import Dashboard from "./components/Admin/dashboard/MainContent";
import Reservation from "./components/Admin/reservations/MainContent"

import PatientDashboard from "./components/Patient/Dashboard/PtMainContent";
import BookAppointment from "./components/Patient/appointment/mainContent";
import "./App.css";
import { Route, Routes } from 'react-router-dom';



function App() {
  return (
    <>
        <Routes>
          <Route path='/' element={<Landing />} />

          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/admin-reservations' element={<Reservation />} />

          <Route path='/patient-dashboard' element={<PatientDashboard />} />
          <Route path='/patient-book-appointment' element={<BookAppointment />} />
        </Routes>
    </>
  );
}

export default App;
