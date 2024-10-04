import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sytle/0.Navbar.css'
import homeImage from '../resources/homeicon.png'
import userImage from '../resources/user.png'
import menuImage from '../resources/menu.png'

const Navbar: React.FC = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleUserClick = () => {
    console.log('buttonclick');
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav>
      <ul className="navBar">
        {/* 왼쪽 섹션 */}
        <li className="navLeft">
          <Link to="/home">
            <img 
              src={homeImage} 
              alt="Home Icon" 
              style={{ width: '30px', height: '30px', cursor: 'pointer' }}
            />
          </Link>
        </li>

        {/* 가운데 섹션 */}
        <div className="navCenter">
          <li>
            <Link to="/facilityList" onClick={closeDropdown}>Facility List</Link>
          </li>
          <li>
            <Link to="/facilityReservation" onClick={closeDropdown}>Reservation</Link>
          </li>
          <li>
            <a onClick={handleUserClick}>User ▼</a>
            {isDropdownOpen && (
              <ul className="dropdownContent">
                <li>
                  <Link to="/myInformation" onClick={closeDropdown}>My Information</Link>
                </li>
                <li>
                  <Link to="/myReservation" onClick={closeDropdown}>My Reservation</Link>
                </li>
              </ul>    
            )}
          </li>
        </div>

        {/* 오른쪽 섹션 */}
        <li className="navRight">
          <img 
            src={userImage} 
            alt="User Icon"
            id='userIcon' 
            onClick={closeDropdown}
            style={{ width: '40px', height: '40px', cursor: 'pointer' }}
          />
          <img 
            src={menuImage} 
            alt="menu Icon"
            id='menuIcon'
            style={{ width: '35px', height: '35px', cursor: 'pointer' }}
          />
        </li>
      </ul>
    </nav>
  );
};


export default Navbar;
