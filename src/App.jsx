import react from "react";
import Landing from "./components/Landing"

import Dashboard from "./components/Admin/dashboard/MainContent";
import Reservation from "./components/Admin/reservations/MainContent"
import AdminStaffList from "./components/Admin-staff-list/Admin-staff-list"
import PatientDashboard from "./components/Patient/Dashboard/PtMainContent";
import "./App.css";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
        <Routes>
          <Route path='/' element={<Landing />} />

          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/admin-reservations' element={<Reservation />} />
          <Route path='/admin-staff' element={<AdminStaffList />} />
          <Route path='/patient-dashboard' element={<PatientDashboard />} />
        </Routes>
    </>
  );
}

export default App;
