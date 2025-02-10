import React from "react";
import Landing from "./components/Landing";
import SignIn from "./components/signin";
import SignUp from "./components/signup";

import Dashboard from "./components/Admin/dashboard/MainContent";
import Reservation from "./components/Admin/reservations/MainContent";
import AdminStaffList from "./components/Admin/Admin-staff-list/Admin-staff-list";


import Treatment from "./components/Admin/treatment/mainContent";

// import Treatment from "./components/Admin/treatment1/mainContent";
// import Treatment from "./components/Admin/treatment2/mainContent";


import Beds from "./components/Admin/BedsAvaliablity/main";
import Bills from "./components/Admin/bills/main";

import AdminProfile from "./components/Admin/Admin-Profile/AdminProfile";

import PatientDashboard from "./components/Patient/Dashboard/PtMainContent";
import BookAppointment from "./components/Patient/appointment/mainContent";
import PatientSchedules from "./components/Patient/PatientSchedules/MainContent";
import PatientProfile from "./components/Patient/PatientProfile/MainContent";
import "./App.css";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <div className="bg-[#f3f4f6]">
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />

        <Route path='/admin' element={<Dashboard />} />
        <Route path='/admin/:userId' element={<Dashboard />} />
        <Route path='/admin-dashboard/:userId'  element={<Dashboard />} />
        <Route path='/admin-reservations/:userId' element={<Reservation />} />
        <Route path='/admin-staff/:userId' element={<AdminStaffList />} />
        <Route path="/admin-treatment/:userId" element={<Treatment />} />
        <Route path='/admin-bills/:userId' element={<Bills />} />
        <Route path='/admin-beds/:userId' element={<Beds />} />
        <Route path="/admin-profile/:userId" element={<AdminProfile />} /> 

        <Route path='/patient' element={<PatientDashboard />} />
        <Route path="/patient/:userId" element={<PatientDashboard />} />
        <Route path='/patient-book-appointment/:userId' element={<BookAppointment />} />
        <Route path="/patient-schedules/:userId" element={<PatientSchedules />}/>
        <Route path="/patient-profile/:userId" element={<PatientProfile/>}/>
      </Routes>
    </div>
    </>
  );
}

export default App;
