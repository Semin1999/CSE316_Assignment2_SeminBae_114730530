import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/0.Navbar';
import Home from './component/1.Home';
import FacilityList from './component/2.FacilityList';
import FacilityReservation from './component/3.FacilityReservation';
import MyInformation from './component/4.MyInformation';
import MyReservation from './component/5.MyReservation';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/facilityList" element={<FacilityList />} />
      <Route path="/facilityReservation" element={<FacilityReservation />} />
      <Route path="/myInformation" element={<MyInformation />} />
      <Route path="/myReservation" element={<MyReservation />} />
    </Routes>
  </Router>
  );
};

export default App;
