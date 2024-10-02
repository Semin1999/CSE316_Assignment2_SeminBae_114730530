import React from 'react';
import { Link } from 'react-router-dom';
import './sytle/0.Navbar.css'
import homeImage from '../resources/homeicon.png'
import userImage from '../resources/user.png'

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul className='navBar'>
        <li className='navLeft'>
          <Link to="/home">
          <img 
              src={homeImage} 
              alt="HomeIcon" 
              style={{ width: '30px', height: '30px', cursor: 'pointer' }}
            />
          </Link>
        </li>
        <div className='navCenter'>
        <li>
            <Link to="/facilityList">Facility List</Link>
          </li>
          <li>
            <Link to="/facilityReservation">Reservation</Link>
          </li>
          <li>
          <Link to="">User ▼</Link>
        </li>
        </div>
        <li className='navRight'>
        <img 
              src={userImage} 
              alt="UserImage" 
              style={{ width: '40px', height: '40px', cursor: 'pointer' }}
            />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
