import React from 'react';
import { Link } from 'react-router-dom';
import './sytle/0.Navbar.css'
import homeIcon from '../resources/homeicon.png'

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">
          <img 
              src={homeIcon} 
              alt="Home Icon" 
              style={{ width: '30px', height: '30px', cursor: 'pointer' }}
            />
          </Link>
        </li>
        <li>
          <Link to="/facilityList">Facility List</Link>
        </li>
        <li>
          <Link to="/facilityReservation">Facility Reservation</Link>
        </li>
        <li>
          <Link to="/myInformation">My Information</Link>
        </li>
        <li>
          <Link to="/myReservation">My Reservation</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
