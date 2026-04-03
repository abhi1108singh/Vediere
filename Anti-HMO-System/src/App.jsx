import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DoctorDashboard from './pages/dashboards/DoctorDashboard';
import HospitalDashboard from './pages/dashboards/HospitalDashboard';
import InsuranceDashboard from './pages/dashboards/InsuranceDashboard';
import PatientDashboard from './pages/dashboards/PatientDashboard';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
        <Route path="/dashboard/hospital" element={<HospitalDashboard />} />
        <Route path="/dashboard/insurance" element={<InsuranceDashboard />} />
        <Route path="/dashboard/patient" element={<PatientDashboard />} />
      </Routes>
    </>
  );
}

export default App;
