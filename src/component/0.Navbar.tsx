/*
  Name: Semin Bae (114730530)
  E-mail: semin.bae@stonybrook.edu
*/
// Use React and useState hook to define state variables
import React, { useState } from 'react';
// Use Link from react-router-dom to navigate between pages
import { Link } from 'react-router-dom';
// Import CSS for styling the navigation bar
import './sytle/0.Navbar.css'

// Here is Navigation Bar part to use React with Typescript
const Navbar: React.FC = () => {
  
  // State for dropdown and hamburger menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // User dropdown state
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false); // Hamburger menu state
  const [isHamburgerUserDropdownOpen, setIsHamburgerUserDropdownOpen] = useState(false); // User dropdown in hamburger menu

  // Toggle user dropdown
  const handleUserClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close all dropdowns and hamburger menu
  const closeDropdown = () => {
    setIsDropdownOpen(false);
    setIsHamburgerMenuOpen(false);
    setIsHamburgerUserDropdownOpen(false);
  };

  // Toggle hamburger menu
  const handleHamburgerMenuClick = () => {
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
    setIsDropdownOpen(false);
    setIsHamburgerUserDropdownOpen(false);
  };

  // Toggle user dropdown inside hamburger menu
  const handleHamburgerUserClick = () => {
    setIsHamburgerUserDropdownOpen(!isHamburgerUserDropdownOpen);
  };

  return (
    <nav>
      <ul className="navBar">
        {/* Left Section (Home link) */}
        <li className="navLeft">
          <Link to="/home" onClick={closeDropdown}>
            <img 
              src={'../../public/resources/homeicon.png'} 
              alt="Home Icon" 
              style={{ width: '30px', height: '30px', cursor: 'pointer' }}
            />
          </Link>
        </li>

        {/* Middle Section (Links to other pages) */}
        <div className="navCenter">
          <li>
            <Link to="/facilityList" onClick={closeDropdown}>Facility List</Link>
          </li>
          <li>
            <Link to="/facilityReservation" onClick={closeDropdown}>Reservation</Link>
          </li>
          <li id='navUser'>
            <a onClick={handleUserClick}>User ▼</a>
            {/* User dropdown menu */}
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

        {/* Right Section (User and Hamburger icons) */}
        <li className="navRight">
          <img 
            src={'../../public/resources/user.png'} 
            alt="User Icon"
            id='userIcon' 
            onClick={closeDropdown}
            style={{ width: '40px', height: '40px', cursor: 'pointer' }}
          />
          <img 
            src={'../../public/resources/menu.png'} 
            alt="menu Icon"
            id='menuIcon'
            onClick={handleHamburgerMenuClick}
            style={{ width: '35px', height: '35px', cursor: 'pointer' }}
          />
        </li>
      </ul>

      {/* Hamburger menu content */}
      {isHamburgerMenuOpen && (
        <ul className='hiddenNav'>
          <Link to="/facilityList" onClick={closeDropdown}><li>Facility List</li></Link>
          <Link to="/facilityReservation" onClick={closeDropdown}><li>Facility Reservation</li></Link>
          <li onClick={handleHamburgerUserClick}>User ▼</li>
          {/* User dropdown inside hamburger menu */}
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