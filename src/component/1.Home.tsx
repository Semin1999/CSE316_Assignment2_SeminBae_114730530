/*
  Name: Semin Bae (114730530)
  E-mail: semin.bae@stonybrook.edu
*/
import React from 'react';
// Import CSS for styling
import './sytle/1.Home.css'

const Home: React.FC = () => {
  // Those are simple hard code to write down the information about this home page. Simple html structure in tsx (assign class name, use h1, etc...)
  return (
  <div>
    <ul className='outerul'>
    <li><h1>Facility Reservation</h1></li>
      <ul className='innerul'>
        <li>Facility List</li>
        <ol>
          <li>Resrvation Date should be the date after today.</li>
          <li>The number of users should be between the maximum number of people and the minimum number of people.</li>
          <li>If the failicy is available only for SUNY Korea, user should be in SUNY Korea.</li>
          <li>The reservation date must be made on the available day of the week.</li>
          <li>The same person cannot book another facility on the same date.</li>
          <p>If all conditions are met, data is stored in local storage.</p>
        </ol>

        <li><h1>User Information</h1></li>
        <ol>
          <li>user profile, user email, user password, user name.</li>
          <li>All other details can be modified except for the user email.</li>
          <li>If the user profile is changed, the image in the navbar will also change.</li>
        </ol>

        <li><h1>Reservation History</h1></li>
        <p>Load the reservation data sotred in the local storage.</p>
        <p>reservation id, facility name, purpose, peopleNum, isSUNY, booker name, date</p>
        <p>Can canccel reservation</p>
      </ul>
    </ul>
  </div>
  );
};

export default Home;