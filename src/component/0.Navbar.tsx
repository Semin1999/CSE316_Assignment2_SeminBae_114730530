import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sytle/0.Navbar.css'
import homeImage from '../../public/resources/homeicon.png'
import userImage from '../../public/resources/user.png'
import menuImage from '../../public/resources/menu.png'

const Navbar: React.FC = () => {
  // Separate state variables for clarity
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Main 'User' dropdown
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false); // Hamburger menu
  const [isHamburgerUserDropdownOpen, setIsHamburgerUserDropdownOpen] = useState(false); // 'User' dropdown in hamburger menu

  // Toggle functions
  const handleUserClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    setIsHamburgerMenuOpen(false);
    setIsHamburgerUserDropdownOpen(false);
  };

  const handleHamburgerMenuClick = () => {
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
    // Close other dropdowns
    setIsDropdownOpen(false);
    setIsHamburgerUserDropdownOpen(false);
  };

  const handleHamburgerUserClick = () => {
    setIsHamburgerUserDropdownOpen(!isHamburgerUserDropdownOpen);
  };

  return (
    <nav>
      <ul className="navBar">
        {/* 왼쪽 섹션 */}
        <li className="navLeft">
          <Link to="/home" onClick={closeDropdown}>
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
            onClick={handleHamburgerMenuClick}
            style={{ width: '35px', height: '35px', cursor: 'pointer' }}
          />
        </li>
      </ul>

      {isHamburgerMenuOpen && (
      <ul className='hiddenNav'>
        <Link to="/facilityList" onClick={closeDropdown}> <li>Facilidty List</li></Link>
        <Link to="/facilityReservation" onClick={closeDropdown}><li>Facility Reservation</li></Link>
        <li onClick={handleHamburgerUserClick}>User ▼</li>
        {isHamburgerUserDropdownOpen && (
        <ul className="hiddendropdownContent">
          <Link to="/myInformation" onClick={closeDropdown}><li>My Information</li></Link>
          <Link to="/myReservation" onClick={closeDropdown}><li>My Reservation</li></Link>
        </ul>    
      )}
      </ul>
      )}
    </nav>
  );
};


export default Navbar;
