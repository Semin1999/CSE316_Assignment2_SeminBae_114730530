import React from 'react';

const Navbar: React.FC = () => {
    return(
        <nav>
            <ul>
                <li>
                    <a href = "1. Home.html"></a>
                </li>
                <li>
                    <a href = "2. FacilityList.html">Facility List</a>
                </li>
                <li>
                    <a href = "3. FacilityReservation.html">Facility Reservation</a>
                </li>
                <li>
                    <a href = "4. MyInformation.html">My Information</a>
                </li>
                <li>
                    <a href="5. MyReservation.html">My Reservation</a>
                </li>
            </ul>
        </nav>
    );
};
    
export default Navbar;