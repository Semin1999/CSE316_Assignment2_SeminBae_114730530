/*
  Name: Semin Bae (114730530)
  E-mail: semin.bae@stonybrook.edu
*/
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/0.Navbar';
import Home from './component/1.Home';
import FacilityList from './component/2.FacilityList';
import FacilityReservation from './component/3.FacilityReservation';
import MyInformation from './component/4.MyInformation';
import MyReservation from './component/5.MyReservation';

const App: React.FC = () => {
  return (
    // Wrap the entire app in a Router component to enable routing
    <Router>
      {/* Navbar will be displayed on all routes */}
      <Navbar />
      {/* Define the routes for each page */}
      <Routes>
        {/* Route for the home page */}
        <Route path="" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {/* Route for the Facility List page */}
        <Route path="/facilityList" element={<FacilityList />} />
        {/* Route for the Facility Reservation page */}
        <Route path="/facilityReservation" element={<FacilityReservation />} />
        {/* Route for the My Information page */}
        <Route path="/myInformation" element={<MyInformation />} />
        {/* Route for the My Reservation page */}
        <Route path="/myReservation" element={<MyReservation />} />
      </Routes>
    </Router>
  );
};

export default App;
